import { useRef, useState } from "react";
import {
  ffmpegSnippet,
  metadataSnippet,
  subtitleSnippet,
  terminalNavigationSnippet,
} from "./snippets";
import "./App.css";
import { twMerge } from "tailwind-merge";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [m3u8CodeCopied, setM3u8CodeCopied] = useState<boolean>(false);
  const [subtitlesCodeCopied, setSubtitlesCodeCopied] =
    useState<boolean>(false);
  const [terminalNavigationCopied, setTerminalNavigationCopied] =
    useState<boolean>(false);
  const [ffmpegCopied, setFfmpegCopied] = useState<boolean>(false);

  async function handleCopyM3u8Snippet() {
    const value = inputRef.current?.value;
    if (!value) return alert("Enter a name");
    const name = `${value.toString()}.m3u8`;
    const snippet = metadataSnippet.replace("<--NAME-->", name);
    try {
      await navigator.clipboard.writeText(snippet);
      setM3u8CodeCopied(true);
      setTimeout(() => setM3u8CodeCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  async function handleCopySubtitlesSnippet() {
    const value = inputRef.current?.value;
    if (!value) return alert("Enter a name");
    const name = `${value.toString()}.vtt`;
    const snippet = subtitleSnippet.replace("<--NAME-->", name);
    try {
      await navigator.clipboard.writeText(snippet);
      setSubtitlesCodeCopied(true);
      setTimeout(() => setSubtitlesCodeCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  async function handleCopyTerminalNavigationSnippet() {
    try {
      await navigator.clipboard.writeText(terminalNavigationSnippet);
      setTerminalNavigationCopied(true);
      setTimeout(() => setTerminalNavigationCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  async function handleCopyFfmpegSnippet() {
    const value = inputRef.current?.value;
    if (!value) return alert("Enter a name");
    const name = value.toString();
    const snippet = ffmpegSnippet.replaceAll("<--NAME-->", name);
    try {
      await navigator.clipboard.writeText(snippet);
      setFfmpegCopied(true);
      setTimeout(() => setFfmpegCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <>
      <header>
        <h1 className="text-5xl font-semibold">iQIYI Downloader</h1>
      </header>
      <main className="w-2xl">
        <ol className="mt-4 mb-4 list-inside list-decimal">
          <li>Open and login to iQIYI.</li>
          <li>Navigate to the video you want to download.</li>
          <li>Fill out the form below then follow the steps listed.</li>
        </ol>

        <form>
          <label htmlFor="name" className="block text-lg">
            Video Name
          </label>
          <input
            ref={inputRef}
            id="name"
            type="text"
            autoComplete="none"
            className="w-full rounded border border-white px-2 py-1"
          />
        </form>
        <ol className="mt-4 list-inside list-decimal">
          <li>Select the quality you want to download.</li>
          <li>
            Open Developer Tools in the iQIYI tab.
            <code className="ml-5 block">Command + Option + J</code>
          </li>
          <li>
            <button
              className={twMerge(
                "cursor-pointer rounded bg-amber-200 px-2 py-1 font-semibold text-black transition-colors",
                m3u8CodeCopied ? "bg-amber-500" : "",
              )}
              onClick={handleCopyM3u8Snippet}
            >
              Click this button to copy the code snippet.{" "}
              {m3u8CodeCopied ? "( Copied )" : ""}
            </button>
          </li>
          <li>
            Paste the snippet into the developer tools console and press enter.
            <span className="ml-5 block">
              A <code>.m3u8</code> file will be downloaded.
            </span>
          </li>
          <li>
            <button
              className={twMerge(
                "cursor-pointer rounded bg-amber-200 px-2 py-1 font-semibold text-black transition-colors",
                subtitlesCodeCopied ? "bg-amber-500" : "",
              )}
              onClick={handleCopySubtitlesSnippet}
            >
              Click this button to copy this other code snippet.{" "}
              {subtitlesCodeCopied ? "( Copied )" : ""}
            </button>
          </li>
          <li>
            Paste the snippet into the developer tools console and press enter.
            <span className="ml-5 block">
              A <code>.vtt</code> file will be downloaded.
            </span>
          </li>
          <li>
            Open a new terminal application.
            <span className="ml-5 block">
              If your previous video is still downloading, open a new tab with{" "}
              <code>Command + T</code>
            </span>
          </li>
          <li>
            <button
              className={twMerge(
                "cursor-pointer rounded bg-amber-200 px-2 py-1 font-semibold text-black transition-colors",
                terminalNavigationCopied ? "bg-amber-500" : "",
              )}
              onClick={handleCopyTerminalNavigationSnippet}
            >
              Click this button to copy this navigation snippet.{" "}
              {terminalNavigationCopied ? "( Copied )" : ""}
            </button>
          </li>
          <li>
            Paste the snippet into the terminal and press enter.
            <span className="ml-5 block">
              It should now read say <code>[YOUR NAME]@mac Downloads %</code>
            </span>
          </li>
          <li>
            <button
              className={twMerge(
                "cursor-pointer rounded bg-amber-200 px-2 py-1 font-semibold text-black transition-colors",
                ffmpegCopied ? "bg-amber-500" : "",
              )}
              onClick={handleCopyFfmpegSnippet}
            >
              Click this button to copy this ffmpeg snippet.{" "}
              {ffmpegCopied ? "( Copied )" : ""}
            </button>
          </li>
          <li>
            Paste the snippet into the terminal and press enter.
            <span className="ml-5 block">
              When complete you should have a <code>.mp4</code> files in your
              downloads folder with the name you entered above.
            </span>
          </li>
          <li>
            <button
              className="cursor-pointer rounded bg-amber-200 px-2 py-1 font-semibold text-black"
              onClick={() => window.location.reload()}
            >
              Click this button to restart.
            </button>
          </li>
        </ol>
        <p>
          Once the <code>.mp4</code> file is done downloading you can delete the{" "}
          <code>.m3u8</code> ond <code>.vtt</code> files.
        </p>
      </main>
    </>
  );
}

export default App;
