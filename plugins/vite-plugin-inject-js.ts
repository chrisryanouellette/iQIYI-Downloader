import * as cheerio from "cheerio";
import { IndexHtmlTransformContext } from "vite";

export default function injectJs() {
  return {
    name: "inject-js",

    async transformIndexHtml(html: string, ctx: IndexHtmlTransformContext) {
      if (!ctx.bundle) return html;
      const parsed = cheerio.load(html);
      for (const [name, content] of Object.entries(ctx.bundle)) {
        if (!name.endsWith(".js")) continue;
        if (!content || !(typeof content === "object")) continue;
        if (!("code" in content)) continue;
        const script = `<script>${content.code}</script>`;

        parsed(`script[src="/${name}"]`).remove();
        parsed("#root").after(script);
      }

      const result = parsed.html();
      return result;
    },
  };
}
