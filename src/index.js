export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // AI image generation
    if (url.pathname === "/generate" && request.method === "POST") {
      try {
        const data = await request.json();
        const prompt = data.prompt;

        if (!prompt) {
          return Response.json(
            { error: "Prompt missing" },
            { status: 400 }
          );
        }

        const result = await env.AI.run(
          "@cf/black-forest-labs/flux-1-schnell",
          {
            prompt: prompt
          }
        );

        return new Response(result, {
          headers: {
            "Content-Type": "image/png"
          }
        });
      } catch (error) {
        return Response.json(
          { error: error.message },
          { status: 500 }
        );
      }
    }

    // Website
    return env.ASSETS.fetch(request);
  }
};
