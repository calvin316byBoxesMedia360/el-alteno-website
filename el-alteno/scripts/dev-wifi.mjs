import { spawn } from "node:child_process";
import os from "node:os";
import { fileURLToPath } from "node:url";

const forwardedArgs = process.argv.slice(2);
const portIndex = forwardedArgs.findIndex((arg) => arg === "--port" || arg === "-p");
const port = portIndex >= 0 ? forwardedArgs[portIndex + 1] : process.env.PORT ?? "3000";
const lanAddresses = Object.values(os.networkInterfaces())
  .flatMap((addresses) => addresses ?? [])
  .filter((address) => {
    const family = address.family;
    return !address.internal && family === "IPv4";
  })
  .map((address) => address.address);

console.log(`Local:  http://127.0.0.1:${port}`);
for (const address of lanAddresses) {
  console.log(`Wi-Fi:  http://${address}:${port}`);
}
console.log("The dev server is listening on all local network interfaces.");

const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextCli, "dev", "--hostname", "0.0.0.0", ...forwardedArgs], {
  stdio: "inherit",
  shell: false,
});

const forwardSignal = (signal) => child.kill(signal);
process.on("SIGINT", () => forwardSignal("SIGINT"));
process.on("SIGTERM", () => forwardSignal("SIGTERM"));
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
