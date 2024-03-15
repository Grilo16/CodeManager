import { invoke } from "@tauri-apps/api/tauri"

export const handleInvoke = async (tauriCommand, tauriArgs) => {
    const result = JSON.parse(await invoke(tauriCommand, tauriArgs))
    if (result.error) {
        throw new Error(result.error)
    }
    return result
}