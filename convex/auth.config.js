const config = {
  providers: [
    {
      domain: "https://www.sketchlie.com/",
      applicationID: process.env.AUTH_SECRET
    },
  ],
};

export default config;