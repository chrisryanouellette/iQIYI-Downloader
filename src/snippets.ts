export const metadataSnippet = `
(() => {
  const movie = window.playerObject.package.engine.movieinfo.current.vidl;
  const output = [];
  for (const info of movie) {
    let m3u8 = \`#EXTM3U\n#EXT-X-TARGETDURATION:10\n\`;
    if (!info.playlist) continue;
    if (!info.playlist.urls.length) continue;
    const qdpDict = info.playlist.qdp;
    const durations = info.playlist.durations;
    for (const [i, baseUrl] of info.playlist.urls.entries()) {
      const qdpKey = baseUrl.split(".ts")[0].split("/").pop();
      const fullUrl = \`https:\${baseUrl}\${qdpDict[qdpKey]}\`;
      const duration = durations[i];
      m3u8 += \`#EXTINF:\${duration},\n\${fullUrl}\n\`;
    }
    m3u8 += "#EXT-X-ENDLIST";
    output.push(m3u8);
  }
  const blob = new Blob(output, { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "<--NAME-->";
  a.click();
})()
`
  .replace("\\`", "`")
  .replace("\\$", "$");

export const subtitleSnippet = `
(async () => {
  const subtitles =
    window.playerObject.package.engine.movieinfo.current.subtitlesUrlMap.list;
  let output = "";
  for (const sub of subtitles) {
    if (sub._name !== "English") continue;
    if (!sub.webvtt) {
      alert("Unable to get subtitle file.");
    }
    const url = new URL(sub.webvtt, "https://meta.video.iqiyi.com/");
    output = url.href;
  }
  const response = await fetch(output);
  if (!response.ok) {
    throw new Error("Something went wrong with the subtitles request.");
  }
  const text = await response.text();
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "<--NAME-->";
  a.click();
})();
`;

export const terminalNavigationSnippet = `cd ~/Downloads`;

export const ffmpegSnippet =
  "ffmpeg -protocol_whitelist file,http,https,tcp,tls -i <--NAME-->.m3u8 -i <--NAME-->.vtt -c copy -bsf:a aac_adtstoasc -c:s mov_text -metadata:s:s:0 language=eng <--NAME-->.mp4";
