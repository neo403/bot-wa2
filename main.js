const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')
const _welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
const setting = JSON.parse(fs.readFileSync('./setting/setting.json'))

require('./jaexploit.js')
nocache('./jaexploit.js', module => console.log(`${module} telah di update !!`))

const starts = async (Dhani = new WAConnection()) => {
    Dhani.logger.level = 'warn'
    Dhani.version = [2, 2142, 12]
    Dhani.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan Qrnya Kak Waktu Cuma 20 Detik !!'))
    })

    fs.existsSync('./newbase.json') && Dhani.loadAuthInfo('./newbase.json')
    Dhani.on('connecting', () => {
        start('2', 'Menghubungkan...')
    })
    Dhani.on('open', () => {
        success('2', 'Done Sudah Terhubung ?')
    })
    await Dhani.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./newbase.json', JSON.stringify(Dhani.base64EncodedAuthInfo(), null, '\t'))

    Dhani.on('chat-update', async (message) => {
        require('./jaexploit.js')(Dhani, message, _welkom)
    })
Dhani.on("group-participants-update", async (anu) => {

    const isWelkom = _welkom.includes(anu.jid)
    try {
      groupMet = await Dhani.groupMetadata(anu.jid)
      groupMembers = groupMet.participants
      groupAdmins = getGroupAdmins(groupMembers)
      mem = anu.participants[0]

      console.log(anu)
      try {
        pp_user = await Dhani.getProfilePicture(mem)
      } catch (e) {
        pp_user = "https://telegra.ph/file/c9dfa715c26518201f478.jpg"
      }
      try {
        pp_grup = await Dhani.getProfilePicture(anu.jid)
      } catch (e) {
        pp_grup =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      }
      if (!isWelkom) return
      if (anu.action == 'add') {
	  num = anu.participants[0]
	  mdata = await Dhani.groupMetadata(anu.jid)
      memeg = mdata.participants.length
      let v = Dhani.contacts[num] || { notify: num.replace(/@.+/, "") }
      anu_user = v.vname || v.notify || num.split("@")[0]
      time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
	  try {
	  ppimg = await Dhani.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
	  } catch {
	  ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	  }
	  image = await getBuffer(`https://apidhani.herokuapp.com/api/creator/welcome3?pp=${pp_user}&nama=${anu_user}&namagc=${encodeURI(mdata.subject)}&bg=https://telegra.ph/file/360059a7e17b82d9fc09f.jpg&member=${memeg}&apikey=${dhakey}`)
	  teks = `𝙃𝘼𝙇𝙇𝙊 𝙆𝘼𝙆  *@${num.split('@')[0]}*
𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝙂𝙍𝙐𝙋 *${mdata.subject}*

𝙅𝘼𝙉𝙂𝘼𝙉 𝙇𝙐𝙋𝘼 𝙄𝙉𝙏𝙍𝙊 :

⊛ *ɴᴀᴍᴀ :*
⊛ *ᴜᴍᴜʀ :*
⊛ *ʜᴏʙʙʏ :*
⊛ *ɢᴇɴᴅᴇʀ :*
⊛ *ᴀꜱᴀʟ ᴋᴏᴛᴀ :*


𝙎𝙀𝙈𝙊𝙂𝘼 𝙆𝘼𝙆𝘼𝙆 𝘽𝙀𝙏𝘼𝙃 𝙔𝘼 
𝘿𝙄 𝙂𝙍𝙐𝙋 𝙄𝙉𝙄`
	  let buff = await getBuffer(ppimg)
	  Dhani.sendMessage(mdata.id, image, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
      } else if (anu.action == 'remove') {
	  num = anu.participants[0]
	  mdata = await Dhani.groupMetadata(anu.jid)
      memeg = mdata.participants.length
      let w = Dhani.contacts[num] || { notify: num.replace(/@.+/, "") }
      anu_user = w.vname || w.notify || num.split("@")[0]
      time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
	  try {
	  ppimg = await Dhani.getProfilePicture(`${num.split('@')[0]}@c.us`)
	  } catch {
	  ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	  }
	  image = await getBuffer(`https://apidhani.herokuapp.com/api/creator/goodbye3?pp=${pp_user}&nama=${anu_user}&namagc=${encodeURI(mdata.subject)}&bg=https://telegra.ph/file/360059a7e17b82d9fc09f.jpg&member=${memeg}&apikey=${dhakey}`)
	  teks = `𝙎𝙀𝙇𝘼𝙈𝘼𝙏 𝙏𝙄𝙉𝙂𝙂𝘼𝙇 @${num.split('@')[0]}\n𝘽𝙏𝙒 𝙅𝘼𝙉𝙂𝘼𝙉 𝘽𝘼𝙇𝙄𝙆 𝙇𝘼𝙂𝙄 𝙔𝘼𝙆`
	  let buff = await getBuffer(ppimg)
	  Dhani.sendMessage(mdata.id, image, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
      }
    } catch (e) {
      console.log("Error : %s", color(e, "red"))
    }

  })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'Sekarang Sedang Di Awasi Oleh JaeGans !!')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
