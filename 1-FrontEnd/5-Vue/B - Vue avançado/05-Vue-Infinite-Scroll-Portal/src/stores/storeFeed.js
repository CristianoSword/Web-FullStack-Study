import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MOCK_PAGES } from '../models/mockData'

export const useStoreFeed = defineStore('feed', () => {
  // Feed States
  const feedItems = ref([...MOCK_PAGES[1]])
  const currentPage = ref(1)
  const maxPage = ref(3)
  const isLoading = ref(false)
  const selectedArticle = ref(null)
  const activeCategory = ref('Todos')

  // Getters
  const filteredFeed = computed(() => {
    return feedItems.value.filter(item => {
      return activeCategory.value === 'Todos' || item.category === activeCategory.value
    })
  })

  const hasMore = computed(() => {
    return currentPage.value < maxPage.value
  })

  // Actions
  function loadNextPage() {
    if (isLoading.value || !hasMore.value) return
    
    isLoading.value = true
    
    // Simulate real network delay for UX/spinner
    setTimeout(() => {
      currentPage.value++
      const nextItems = MOCK_PAGES[currentPage.value] || []
      feedItems.value.push(...nextItems)
      isLoading.value = false
    }, 1000)
  }

  function selectArticle(article) {
    selectedArticle.value = article
  }

  function closeArticle() {
    selectedArticle.value = null
  }

  function setCategory(cat) {
    activeCategory.value = cat
  }

  return {
    feedItems,
    currentPage,
    maxPage,
    isLoading,
    selectedArticle,
    activeCategory,
    filteredFeed,
    hasMore,
    loadNextPage,
    selectArticle,
    closeArticle,
    setCategory
  }
})
