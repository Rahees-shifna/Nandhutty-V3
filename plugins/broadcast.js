let handler = async (m, { conn, text }) => {
  let chats = conn.chats.all().filter(v => v.jid.endsWith('.net')).map(v => v.jid)
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Send a broadcast message to ${chats.length} chat_\nEstimation complete ${chats.length * 1.5} second`, m)
  for (let id of chats) {
    await delay(1500)
    await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : ' *〔  𝙍𝘼𝙃𝙀𝙀𝙎〕*\n\n' + teks + '\n\n' + `*[𝙍𝘼𝙃𝙀𝙀𝙎 ]*`), true).catch(_ => _)
  }
  m.reply('_*Broadcast Complete*_')
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(bcchat|bc)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)


const delay = time => new Promise(res => setTimeout(res, time))
