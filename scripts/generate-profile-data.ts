import fs from 'fs';
import path from 'path';
import PDFParser from 'pdf2json';

async function generateProfileData() {
    console.log('--- Generating Profile Data ---');
    try {
        // 1. Fetch GitHub Profile
        const profileRes = await fetch('https://api.github.com/users/amcamargoc', {
            headers: { Accept: 'application/vnd.github.v3+json' },
        });

        if (!profileRes.ok) {
            throw new Error(`GitHub API error: ${profileRes.statusText}`);
        }

        const profileData = await profileRes.json();

        // 2. Fetch Repositories to calculate Language Tech Stack
        const reposRes = await fetch('https://api.github.com/users/amcamargoc/repos?per_page=100&sort=updated', {
            headers: { Accept: 'application/vnd.github.v3+json' },
        });

        const languagesMap: Record<string, number> = {};
        if (reposRes.ok) {
            const repos = await reposRes.json() as any[];
            repos.forEach((repo: any) => {
                if (repo.language) {
                    languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
                }
            });
        }

        // Sort languages by freq
        const topLanguages = Object.entries(languagesMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([lang]) => lang);

        // 3. Fetch Metadata (Check multiple local paths, then GitHub)
        let extractedMetadata: any = {};
        const localPaths = [
            path.join(process.cwd(), 'src', 'metadata.json'),
            path.join(process.cwd(), 'metadata.json')
        ];

        for (const p of localPaths) {
            if (fs.existsSync(p)) {
                try {
                    const localMetadata = fs.readFileSync(p, 'utf8');
                    extractedMetadata = JSON.parse(localMetadata);
                    if (Object.keys(extractedMetadata).length > 0) break;
                } catch (e) {
                    console.error(`Error reading metadata at ${p}:`, e);
                }
            }
        }

        if (Object.keys(extractedMetadata).length === 0) {
            const metadataRes = await fetch('https://raw.githubusercontent.com/amcamargoc/amcamargoc/main/metadata.json');
            if (metadataRes.ok) {
                extractedMetadata = await metadataRes.json();
            }
        }

        // 4. Parse LinkedIn PDF locally
        let experienceData: any[] = [];
        try {
            const pdfPath = path.join(process.cwd(), 'public', 'linkedin_profile.pdf');
            if (fs.existsSync(pdfPath)) {
                const pdfParser = new PDFParser(null, true);

                const pdfText = await new Promise<string>((resolve, reject) => {
                    pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError || errData));
                    pdfParser.on("pdfParser_dataReady", () => {
                        resolve(pdfParser.getRawTextContent());
                    });
                    pdfParser.loadPDF(pdfPath);
                });

                const cleanText = pdfText.replace(/\r\n/g, '\n');
                const expIndex = cleanText.indexOf("Experience");
                const eduIndex = cleanText.indexOf("Education");

                if (expIndex !== -1) {
                    const experienceChunk = cleanText.slice(
                        expIndex + "Experience".length,
                        eduIndex !== -1 ? eduIndex : cleanText.length
                    );

                    const lines = experienceChunk.split('\n').map((l: string) => l.trim()).filter(Boolean);
                    experienceData = lines.map((line: string, i: number) => ({
                        id: i,
                        text: line
                    }));
                }
            }
        } catch (pdfErr) {
            console.error("Error parsing PDF:", pdfErr);
        }

        const finalData = {
            profile: {
                name: profileData.name || 'ALBERTO CAMARGO',
                bio: profileData.bio || '',
                avatar_url: profileData.avatar_url || '',
                login: profileData.login || 'amcamargoc',
            },
            techStack: topLanguages.length > 0 ? topLanguages : ['TypeScript', 'React', 'Node.js'],
            metadata: extractedMetadata,
            experienceRaw: experienceData,
            generatedAt: new Date().toISOString()
        };

        const outputPath = path.join(process.cwd(), 'src', 'data', 'profile-data.json');
        fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
        console.log(`Successfully generated profile data to: ${outputPath}`);

    } catch (error) {
        console.error('Critical error generating profile data:', error);
        process.exit(1);
    }
}

generateProfileData();
