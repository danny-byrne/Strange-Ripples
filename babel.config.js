console.log("Using custom Babel config for styled-components");

module.exports = {
  presets: ["next/babel"],
  plugins: [["styled-components", { ssr: true, displayName: true }]],
};
