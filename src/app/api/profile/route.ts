export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import PDFParser from 'pdf2json';

export async function GET() {
    try {
        // 1. Fetch GitHub Profile
        const profileRes = await fetch('https://api.github.com/users/amcamargoc', {
            next: { revalidate: 3600 },
            headers: { Accept: 'application/vnd.github.v3+json' },
        });

        if (!profileRes.ok) {
            throw new Error(`GitHub API error: ${profileRes.statusText}`);
        }

        const profileData = await profileRes.json();

        // 2. Fetch Repositories to calculate Language Tech Stack
        const reposRes = await fetch('https://api.github.com/users/amcamargoc/repos?per_page=100&sort=updated', {
            next: { revalidate: 3600 },
            headers: { Accept: 'application/vnd.github.v3+json' },
        });

        const languagesMap: Record<string, number> = {};
        if (reposRes.ok) {
            const repos = await reposRes.json();
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
            const metadataRes = await fetch('https://raw.githubusercontent.com/amcamargoc/amcamargoc/main/metadata.json', {
                cache: 'no-store',
            });

            if (metadataRes.ok) {
                extractedMetadata = await metadataRes.json();
            }
        }

        // 4. Parse LinkedIn PDF locally
        let experienceData: any[] = [];
        try {
            const pdfPath = path.join(process.cwd(), 'public', 'linkedin_profile.pdf');
            if (fs.existsSync(pdfPath)) {
                // @ts-ignore - The typings for pdf2json are outdated in strict mode 
                const pdfParser = new PDFParser(null, 1); // 1 = returns raw text content

                const pdfText = await new Promise<string>((resolve, reject) => {
                    pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
                    pdfParser.on("pdfParser_dataReady", () => {
                        resolve(pdfParser.getRawTextContent());
                    });
                    pdfParser.loadPDF(pdfPath);
                });

                // Clean the raw text by replacing the weird carriage return artifacts from pdf2json
                const cleanText = pdfText.replace(/\r\n/g, '\n');

                const expIndex = cleanText.indexOf("Experience");
                const eduIndex = cleanText.indexOf("Education");

                if (expIndex !== -1) {
                    const experienceChunk = cleanText.slice(
                        expIndex + "Experience".length,
                        eduIndex !== -1 ? eduIndex : cleanText.length
                    );

                    // Split and trim
                    const lines = experienceChunk.split('\n').map((l: string) => l.trim()).filter(Boolean);

                    experienceData = lines.map((line: string, i: number) => ({
                        id: i,
                        text: line
                    }));
                }
            } else {
                console.warn("linkedin_profile.pdf not found in public folder. Skipping PDF parse.");
            }
        } catch (pdfErr) {
            console.error("Error parsing PDF:", pdfErr);
        }

        const response = NextResponse.json({
            profile: {
                name: profileData.name || 'ALBERTO CAMARGO',
                bio: profileData.bio || '',
                avatar_url: profileData.avatar_url || '',
                login: profileData.login || 'amcamargoc',
            },
            techStack: topLanguages.length > 0 ? topLanguages : ['TypeScript', 'React', 'Node.js'],
            metadata: extractedMetadata,
            experienceRaw: experienceData,
        });

        response.headers.set('Cache-Control', 'no-store, max-age=0');
        return response;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile data' },
            { status: 500 }
        );
    }
}
