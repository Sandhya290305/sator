module.exports = {
  packagerConfig: {
    name: 'SATOR',
    executableName: 'SATOR',
    icon: './public/assets/generated/app-icon-transparent.dim_256x256',
    asar: true,
    extraResource: [
      './dist',
      './public/assets'
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'SATOR',
        authors: 'SATOR',
        description: 'SATOR - Interactive Excel and PowerPoint Learning Game',
        iconUrl: 'https://example.com/icon.ico',
        setupIcon: './public/assets/generated/app-icon-transparent.dim_256x256.png',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
