module.exports = {
    ci: {
        collect: {
            startServerCommand: "npm run start",
            url: ["http://localhost:4201"],
            // startServerReadyPattern: "Angular Live Development Server is listening on localhost:4200",
        },
        settings: {
            "chromeFlags": "--no-sandbox"
        },
        upload: {
            target: 'temporary-public-storage',
        },
        assert: {
            assertions: {
                'categories:performance': ['warn', { minScore: 1 }],
                'categories:accessibility': ['error', { minScore: 1 }]
            }
        },
    },
};
