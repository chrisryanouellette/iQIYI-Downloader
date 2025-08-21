import * as cheerio from "cheerio";
import { IndexHtmlTransformContext } from "vite";

export default function injectCss() {
  return {
    name: "inject-css",

    async transformIndexHtml(html: string, ctx: IndexHtmlTransformContext) {
      if (!ctx.bundle) return html;
      const parsed = cheerio.load(html);
      for (const [name, content] of Object.entries(ctx.bundle)) {
        if (!name.endsWith(".css")) continue;
        if (!content || !(typeof content === "object")) continue;
        if (!("source" in content)) continue;
        const style = `<style>${content.source}</style>`;
        parsed(`link[href="/${name}"]`).replaceWith(style);
      }

      const result = parsed.html();
      return result;
    },
  };
}
