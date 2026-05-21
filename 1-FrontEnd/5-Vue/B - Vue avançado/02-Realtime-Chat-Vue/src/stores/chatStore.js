import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { INITIAL_CHANNELS, INITIAL_MESSAGES, MOCK_BOTS } from '../models/mockData'

export const useChatStore = defineStore('chat', () => {
  // App Core States
  const channels = ref(JSON.parse(localStorage.getItem('aurachat_channels')) || INITIAL_CHANNELS)
  const messages = ref(JSON.parse(localStorage.getItem('aurachat_messages')) || INITIAL_MESSAGES)
  const activeChannelId = ref('general')
  
  // Current user configuration
  const currentUser = ref({
    name: 'Cristiano Sword',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cristiano',
    isBot: false
  })

  // Typing status of bots
  const typingBotName = ref(null)

  // Getters
  const activeChannel = computed(() => {
    return channels.value.find(c => c.id === activeChannelId.value)
  })

  const activeMessages = computed(() => {
    return messages.value[activeChannelId.value] || []
  })

  // Actions
  function selectChannel(channelId) {
    activeChannelId.value = channelId
  }

  function sendMessage(text) {
    if (!text.trim()) return

    const newMsg = {
      id: Date.now(),
      sender: { ...currentUser.value },
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    if (!messages.value[activeChannelId.value]) {
      messages.value[activeChannelId.value] = []
    }
    
    messages.value[activeChannelId.value].push(newMsg)
    saveMessages()

    // Trigger Bot Re-activity Sync if bot is tagged
    checkForBotMention(text)
  }

  function createChannel({ name, icon, description }) {
    const cleanId = name.toLowerCase().replace(/\s+/g, '-')
    if (channels.value.some(c => c.id === cleanId)) return false

    const newChannel = {
      id: cleanId,
      name: name,
      icon: icon || '📁',
      description: description || ''
    }

    channels.value.push(newChannel)
    messages.value[cleanId] = []
    
    saveChannels()
    saveMessages()
    return true
  }

  // Interactive Bot AI Simulator Logic
  function checkForBotMention(text) {
    const textLower = text.toLowerCase()
    
    if (textLower.includes('@jarvis')) {
      triggerBotResponse(MOCK_BOTS.jarvis, getJarvisResponse(textLower))
    } else if (textLower.includes('@suporte-bot') || textLower.includes('@suporte')) {
      triggerBotResponse(MOCK_BOTS.support, getSupportResponse(textLower))
    } else if (textLower.includes('@gamerbot')) {
      triggerBotResponse(MOCK_BOTS.gamer, getGamerResponse(textLower))
    }
  }

  function triggerBotResponse(bot, responseText) {
    typingBotName.value = bot.name

    // Simulate natural writing latency
    setTimeout(() => {
      typingBotName.value = null
      
      const botMsg = {
        id: Date.now() + 1,
        sender: {
          name: bot.name,
          avatar: bot.avatar,
          isBot: true
        },
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      if (!messages.value[activeChannelId.value]) {
        messages.value[activeChannelId.value] = []
      }
      
      messages.value[activeChannelId.value].push(botMsg)
      saveMessages()
    }, 1500)
  }

  // Bot response generators
  function getJarvisResponse(text) {
    if (text.includes('tarefa') || text.includes('todo')) {
      return 'Com certeza! Analisei seu backlog. O primeiro projeto de Vue Avançado foi finalizado com perfeição. Próximo passo recomendado: Otimizar seu sistema de diretivas personalizadas! 🚀'
    }
    if (text.includes('status') || text.includes('performance')) {
      return 'Todos os sistemas estão operando em desempenho máximo. Latência local de resposta: 0.2ms. FPS do renderer de CSS: 60 FPS estável. ✨'
    }
    return 'Sim, mestre Cristiano! Estou monitorando as estatísticas do repositório FullStack. Se precisar de relatórios de produtividade, basta solicitar.'
  }

  function getSupportResponse(text) {
    if (text.includes('vue') || text.includes('router')) {
      return 'Dica técnica do Vue Router: Sempre implemente navigation guards usando stores globais instanciadas diretamente dentro da callback `beforeEach` para evitar o erro de inicialização do Pinia!'
    }
    if (text.includes('css') || text.includes('style')) {
      return 'Dica estética: Utilizar HSL em variáveis CSS permite que você controle opacidade facilmente usando a sintaxe `hsla(var(--primary), 0.15)`!'
    }
    return 'Olá! Sou o Suporte-Bot. Para dicas avançadas sobre Vue 3, Pinia ou Web performance, pergunte-me!'
  }

  function getGamerResponse(text) {
    if (text.includes('mu') || text.includes('online')) {
      return 'Mu Online é lendário! Sabia que a renderização original rodava em OpenGL 1.1 e agora está sendo portada para 3.3 moderna com VBOs de alta taxa de quadros? ⚔️'
    }
    return 'E aí, campeão! Pronto para a jogatina? Jogue um "clean code" no seu editor para pontuar o score máximo!'
  }

  // LocalStorage Persist Helpers
  function saveChannels() {
    localStorage.setItem('aurachat_channels', JSON.stringify(channels.value))
  }

  function saveMessages() {
    localStorage.setItem('aurachat_messages', JSON.stringify(messages.value))
  }

  return {
    channels,
    messages,
    activeChannelId,
    currentUser,
    typingBotName,
    activeChannel,
    activeMessages,
    selectChannel,
    sendMessage,
    createChannel
  }
})
