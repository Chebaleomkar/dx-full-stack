import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'DisciplineX',
        short_name: 'DX',
        description: 'DisciplineX is a cutting-edge platform that helps schools and colleges streamline discipline management, track student behavior, and promote a culture of accountability and success. Empower your institution with real-time insights, fine management, and rewards for disciplined students.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: 'icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}