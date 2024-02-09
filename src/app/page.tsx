'use client'

import { Hash, MagnifyingGlass, User } from "@phosphor-icons/react"
import { Asterisk } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

interface PropsUser {

  id: string,

  created_at: string,

  username: string,

  avatar: {

    id: string,

    link: string,

    is_animated: boolean

  },

  avatar_decoration: null,

  badges: Array<string>,

  premium_type: string,

  accent_color: number,

  global_name: string,

  banner: {

    id: string,

    link: string,

    is_animated: boolean,

    color: string

  },

}

export default function Home() {
  const [discordUser, setDiscordUser] = useState<null | PropsUser>(null);
  const [inputValue, setInputValue] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  async function searchUser() {
    setLoading(true);
    if (inputValue) {
      let dados = await fetch(`https://discordlookup.mesavirep.xyz/v1/user/${inputValue}`)

      if (dados.ok) {
        let dadosDiscordUser = await dados.json();
        let data = new Date(dadosDiscordUser.created_at);

        const dia = data.getDate();
        const mes = data.getMonth();
        const ano = data.getFullYear();

        const dataFormatada = `${dia}/${mes}/${ano}`;
        dadosDiscordUser.created_at = dataFormatada

        if (dadosDiscordUser.badges && Array.isArray(dadosDiscordUser.badges)) {
          const badgesUrls = dadosDiscordUser.badges.map((badge: string) => {
            switch (badge) {
              case 'BUGHUNTER_LEVEL_1':
                return 'https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png';
              case 'DISCORD_PARTNER':
                return 'https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png';
              case 'ACTIVE_DEVELOPER':
                return 'https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png';
              case 'HOUSE_BRILLIANCE':
                return 'https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png'
              case 'HOUSE_BRAVERY':
                return 'https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png'
              case 'HOUSE_BALANCE':
                return 'https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png'
              default:
                return null;
            }
          });

          dadosDiscordUser.badges = badgesUrls;
        }

        setDiscordUser(dadosDiscordUser)
      } else {
        alert("Ocorreu uma falha");
        setInputValue(null)
      }
    }

    setLoading(false)
  }

  return (
    <main className="flex flex-col w-screen h-screen">
      <header className="w-full h-20 flex items-center justify-center gap-4 text-[2.5rem] text-white bg-[#5865f2]">
        <MagnifyingGlass /> Discard
      </header>

      <div className="w-full flex mx-auto p-24 items-center justify-center">
        <div className="flex items-center justify-center flex-col">
          <div className="flex gap-5 text-white mb-4">
            <input placeholder="id discord" onChange={(event) => setInputValue(event.target.value)} className="w-full p-3 rounded-lg border border-gray-600 bg-[#2c2e33] focus:bg-[#2c2e33]" type="text" />
            <button disabled={loading} onClick={searchUser} className="bg-[#5865f2] border-none font-[500] rounded-lg p-[0.9rem]">
              {loading ? <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg> : 'Pesquisar'}
            </button>
          </div>

          <div className="bg-[#232328] w-full h-auto rounded-lg border border-gray-600">
            {discordUser ? <div>
              <img className="w-full h-[150px] rounded-t-[8px]" src={`${discordUser.banner.link ?? './img/preto.webp'}`} style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} alt={`banneruser-${discordUser.id}`} />

              <div className="relative flex flex-col items-end justify-between px-8 mt-5">
                <div>
                  <img className="absolute bottom-48 left-6 rounded-full w-24 h-24 border-[5px] border-[#2c2e33]" src={discordUser.avatar.link} alt="banner" referrerPolicy="no-referrer" />
                </div>

                <div className="flex flex-row gap-4 mb-4">
                  {discordUser.badges.map(item => (
                    <div key={item} className="bg-black rounded-lg p-2">
                      <img className="w-8 h-8" src={item} alt="" />
                    </div>
                  ))}
                </div>

                <div className="w-full flex items-start rounded-lg p-8 flex-col bg-black my-2">
                  <div className="flex flex-row items-center gap-2 text-white">
                    <User /> ID: <span className="text-[#5865f2]"> {discordUser.id}</span>
                  </div>

                  <div className="flex flex-row items-center gap-2 text-white">
                    <Hash /> Usuário: <span className="text-[#eb459e]"> {discordUser.global_name}</span>
                  </div>

                  <div className="flex flex-row items-center gap-2 text-white">
                    <Asterisk /> Criado em: <span className="text-[#57f287]"> {discordUser.created_at}</span>
                  </div>
                </div>
              </div>
            </div> :
              <div>
                <img className="w-full h-[150px] rounded-t-[8px]" src="./img/preto.webp" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} alt="" />

                <div className="relative flex flex-col items-end justify-between px-8 mt-5">
                  <div>
                    <img className="absolute bottom-48 left-6 rounded-full w-24 h-24 border-[5px] border-[#2c2e33]" src="https://c.wallhere.com/photos/7f/cb/anime_anime_girls_digital_art_artwork_2D_portrait_display_vertical_5_toubun_no_Hanayome-1658583.jpg!d" alt="banner" referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex flex-row gap-4 mb-4">
                    <div className="bg-black rounded-lg p-2">
                      <img className="w-8 h-8" src="https://discard.birobirobiro.dev/assets/badges/hypesquadbrilliance.svg" alt="" />
                    </div>
                  </div>

                  <div className="w-full flex items-start rounded-lg p-8 flex-col bg-black my-2">
                    <div className="flex flex-row items-center gap-2 text-white">
                      <User /> ID: <span className="text-[#5865f2]"> 123456789126479</span>
                    </div>

                    <div className="flex flex-row items-center gap-2 text-white">
                      <Hash /> Usuário: <span className="text-[#eb459e]"> Digite um id</span>
                    </div>

                    <div className="flex flex-row items-center gap-2 text-white">
                      <Asterisk /> Criado em: <span className="text-[#57f287]"> 123456789126479</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-center">
        <a className="text-white" href="https://cloudlector.xyz">cloudlector.xyz</a>
      </footer>
    </main>
  );
}
