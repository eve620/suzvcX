const audio = new Audio()

export async function playAudio(url: string) {
    audio.src = url
    audio.load()
    await audio.play()
}