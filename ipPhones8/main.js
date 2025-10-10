// ============================================
// DATA MANAGEMENT
// ============================================

// Default phone images for different models
const phoneImages = {
  Cisco: "/public/cisco-ip-phone-black-professional-office.jpg",
  Yealink: "/public/yealink-ip-phone-modern-sleek-design.jpg",
  Polycom: "/public/polycom-ip-phone-conference-system.jpg",
  default: "/public/generic-ip-phone-office-equipment.jpg",
}

// Get phone image based on model
function getPhoneImage(model) {
  for (const [brand, image] of Object.entries(phoneImages)) {
    if (model.toLowerCase().includes(brand.toLowerCase())) {
      return image
    }
  }
  return phoneImages.default
}

// Sample data
const defaultPhones = [
  {
    id: 1,
    model: "Cisco 7841",
    mac: "00:1A:2B:3C:4D:5E",
    ip: "192.168.1.101",
    status: "assigned",
    user: "Иванов И.И.",
    department: "IT",
    notes: "Основной телефон",
  },
  {
    id: 2,
    model: "Yealink T46S",
    mac: "00:1A:2B:3C:4D:5F",
    ip: "192.168.1.102",
    status: "free",
    user: "",
    department: "",
    notes: "",
  },
  {
    id: 3,
    model: "Polycom VVX 450",
    mac: "00:1A:2B:3C:4D:60",
    ip: "192.168.1.103",
    status: "assigned",
    user: "Петров П.П.",
    department: "Продажи",
    notes: "Конференц-зал",
  },
  {
    id: 4,
    model: "Cisco 8841",
    mac: "00:1A:2B:3C:4D:61",
    ip: "192.168.1.104",
    status: "broken",
    user: "",
    department: "",
    notes: "Не работает дисплей",
  },
  {
    id: 5,
    model: "Yealink T42S",
    mac: "00:1A:2B:3C:4D:62",
    ip: "192.168.1.105",
    status: "free",
    user: "",
    department: "",
    notes: "",
  },
  {
    id: 6,
    model: "Cisco 7821",
    mac: "00:1A:2B:3C:4D:63",
    ip: "192.168.1.106",
    status: "assigned",
    user: "Сидоров С.С.",
    department: "Бухгалтерия",
    notes: "",
  },
  {
    id: 7,
    model: "Polycom VVX 250",
    mac: "00:1A:2B:3C:4D:64",
    ip: "192.168.1.107",
    status: "free",
    user: "",
    department: "",
    notes: "",
  },
  {
    id: 8,
    model: "Yealink T48S",
    mac: "00:1A:2B:3C:4D:65",
    ip: "192.168.1.108",
    status: "assigned",
    user: "Козлов К.К.",
    department: "Маркетинг",
    notes: "Руководитель отдела",
  },
]

// Column definitions
const defaultColumns = [
  { id: "model", label: "Модель", visible: true, custom: false },
  { id: "mac", label: "MAC адрес", visible: true, custom: false },
  { id: "ip", label: "IP адрес", visible: true, custom: false },
  { id: "status", label: "Статус", visible: true, custom: false },
  { id: "user", label: "Пользователь", visible: true, custom: false },
  { id: "department", label: "Отдел", visible: true, custom: false },
  { id: "notes", label: "Примечания", visible: false, custom: false },
]

// Load data from localStorage or use defaults
const phones = JSON.parse(localStorage.getItem("phones")) || defaultPhones
let columns = JSON.parse(localStorage.getItem("columns")) || defaultColumns
let theme = localStorage.getItem("theme") || "dark"
let sortColumn = null
let sortDirection = null // 'asc' or 'desc'
let activities = JSON.parse(localStorage.getItem("activities")) || []

// Save data to localStorage
function saveData() {
  localStorage.setItem("phones", JSON.stringify(phones))
  localStorage.setItem("columns", JSON.stringify(columns))
  localStorage.setItem("activities", JSON.stringify(activities))
}

function logActivity(action, phoneModel, details = "") {
  const timestamp = new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  activities.unshift({
    timestamp,
    action,
    phoneModel,
    details,
  })

  // Keep only last 50 activities
  if (activities.length > 50) {
    activities = activities.slice(0, 50)
  }

  saveData()
  renderActivityLog()
}

function renderActivityLog() {
  const container = document.getElementById("activity-log")
  const recentActivities = activities.slice(0, 3)

  if (recentActivities.length === 0) {
    container.innerHTML = '<p class="text-cyan-400/50 text-sm">Нет записей</p>'
    return
  }

  container.innerHTML = recentActivities
    .map(
      (activity) => `
        <div class="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-cyan-400/20">
            <div class="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-cyan-400"></div>
            <div class="flex-1 min-w-0">
                <p class="text-cyan-100 text-sm">
                    <span class="font-bold text-cyan-400">${activity.phoneModel}</span>
                    ${activity.action}
                    ${activity.details ? `<span class="text-cyan-400/70">${activity.details}</span>` : ""}
                </p>
                <p class="text-cyan-400/50 text-xs mt-1">${activity.timestamp}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

function updateStatistics() {
  const total = phones.length
  const free = phones.filter((p) => p.status === "free").length
  const assigned = phones.filter((p) => p.status === "assigned").length
  const broken = phones.filter((p) => p.status === "broken").length

  document.getElementById("stat-total").textContent = total
  document.getElementById("stat-free").textContent = free
  document.getElementById("stat-assigned").textContent = assigned
  document.getElementById("stat-broken").textContent = broken
}

// ============================================
// THEME MANAGEMENT
// ============================================

function applyTheme() {
  const body = document.body
  const themeToggle = document.getElementById("theme-toggle")
  const themeName = document.getElementById("theme-name")
  const brandLogo = document.getElementById("brand-logo")

  if (theme === "light") {
    body.classList.remove("bg-gradient-to-br", "from-[#0a0a0f]", "via-[#0f172a]", "to-[#1a1a2e]", "text-cyan-100")
    body.classList.add("bg-gradient-to-br", "from-slate-100", "via-blue-50", "to-purple-50", "text-slate-900")
    themeName.textContent = "ТЕХНО-СВЕТ"
    brandLogo.src = "/public/skuffcall-logo-grungy.png"

    // Update glass elements
    document.querySelectorAll(".glass").forEach((el) => {
      el.classList.remove("glass")
      el.classList.add("glass-light")
    })
  } else {
    body.classList.remove("bg-gradient-to-br", "from-slate-100", "via-blue-50", "to-purple-50", "text-slate-900")
    body.classList.add("bg-gradient-to-br", "from-[#0a0a0f]", "via-[#0f172a]", "to-[#1a1a2e]", "text-cyan-100")
    themeName.textContent = "НЕОН ТЬМЫ"
    brandLogo.src = "/public/skuffcall-logo-neon.png"

    // Update glass elements
    document.querySelectorAll(".glass-light").forEach((el) => {
      el.classList.remove("glass-light")
      el.classList.add("glass")
    })
  }
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark"
  localStorage.setItem("theme", theme)
  applyTheme()
})

// ============================================
// STATISTICS
// ============================================

function updateStats() {
  const total = phones.length
  const free = phones.filter((p) => p.status === "free").length
  const assigned = phones.filter((p) => p.status === "assigned").length
  const broken = phones.filter((p) => p.status === "broken").length

  const stats = [
    { label: "ВСЕГО", value: total, color: "cyan", icon: "📱" },
    { label: "СВОБОДНЫЕ", value: free, color: "emerald", icon: "✓" },
    { label: "ВЫДАННЫЕ", value: assigned, color: "magenta", icon: "👤" },
    { label: "ПОЛОМАННЫЕ", value: broken, color: "red", icon: "⚠" },
  ]

  const container = document.getElementById("stats-container")
  container.innerHTML = stats
    .map(
      (stat) => `
        <div class="glass rounded-xl p-6 border-2 border-${stat.color}-400/30 hover-lift fade-in">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-${stat.color}-400 text-sm font-bold mb-2">${stat.label}</p>
                    <p class="text-4xl font-black text-${stat.color}-400 neon-text">${stat.value}</p>
                </div>
                <div class="text-5xl opacity-20">${stat.icon}</div>
            </div>
            <div class="mt-4 h-2 bg-black/30 rounded-full overflow-hidden">
                <div class="h-full bg-${stat.color}-400 neon-glow pulse-glow" style="width: ${total > 0 ? (stat.value / total) * 100 : 0}%"></div>
            </div>
        </div>
    `,
    )
    .join("")
}

// ============================================
// TABLE RENDERING
// ============================================

function renderTable(filteredPhones = phones) {
  const visibleColumns = columns.filter((col) => col.visible)
  const headerRow = document.getElementById("table-header")
  const tableBody = document.getElementById("table-body")

  headerRow.innerHTML =
    visibleColumns
      .map(
        (col, index) => `
        <th 
            draggable="true" 
            data-column-id="${col.id}"
            data-index="${index}"
            class="px-4 md:px-6 py-3 md:py-4 text-left text-cyan-400 font-bold uppercase tracking-wider cursor-move hover:bg-cyan-400/5 transition-colors group text-sm"
        >
            <div class="flex items-center justify-between gap-2">
                <span class="sort-header cursor-pointer flex items-center" data-sort-column="${col.id}">
                    ${col.label}
                    <span class="sort-indicator ${sortColumn === col.id ? "active" : ""}">
                        ${sortColumn === col.id ? (sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "⇅") : "⇅"}
                    </span>
                </span>
                <button 
                    class="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity text-yellow-400"
                    data-toggle-column="${col.id}"
                    title="Скрыть"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                </button>
            </div>
        </th>
    `,
      )
      .join("") +
    `
    <th class="px-4 md:px-6 py-3 md:py-4 text-center relative">
        <button 
            id="add-column-btn"
            class="text-emerald-400 hover:text-emerald-300 transition-colors"
            title="Добавить столбец"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
        </button>
        <div id="hidden-columns-dropdown" class="hidden absolute right-0 top-full mt-2 bg-black/95 border border-cyan-400 rounded-lg shadow-lg z-50 min-w-[200px]"></div>
    </th>
    `

  headerRow.querySelectorAll(".sort-header").forEach((header) => {
    header.addEventListener("click", (e) => {
      e.stopPropagation()
      const column = header.dataset.sortColumn
      handleSort(column)
    })
  })

  headerRow.querySelectorAll("[data-toggle-column]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      const columnId = btn.dataset.toggleColumn
      if (columnId) toggleColumnVisibility(columnId)
    })
  })

  const addColumnBtn = document.getElementById("add-column-btn")
  if (addColumnBtn) {
    addColumnBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      toggleHiddenColumnsDropdown()
    })
  }

  const headers = headerRow.querySelectorAll("th[draggable]")
  headers.forEach((header) => {
    header.addEventListener("dragstart", handleDragStart)
    header.addEventListener("dragover", handleDragOver)
    header.addEventListener("drop", handleDrop)
    header.addEventListener("dragend", handleDragEnd)
  })

  const phonesToRender = [...filteredPhones]
  if (sortColumn && sortDirection) {
    phonesToRender.sort((a, b) => {
      let aVal = a[sortColumn] || ""
      let bVal = b[sortColumn] || ""

      if (typeof aVal === "string") aVal = aVal.toLowerCase()
      if (typeof bVal === "string") bVal = bVal.toLowerCase()

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  tableBody.innerHTML = phonesToRender
    .map(
      (phone) => `
        <tr 
            data-phone-id="${phone.id}"
            class="border-b border-cyan-400/10 hover:bg-cyan-400/5 cursor-pointer transition-all"
        >
            ${visibleColumns
              .map((col) => {
                if (col.id === "status") {
                  return `<td class="px-4 md:px-6 py-3 md:py-4">${getStatusBadge(phone.status)}</td>`
                }
                return `<td class="px-4 md:px-6 py-3 md:py-4 text-cyan-100 text-sm">${phone[col.id] || "-"}</td>`
              })
              .join("")}
            <td></td>
        </tr>
    `,
    )
    .join("")

  tableBody.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => {
      const phoneId = Number.parseInt(row.dataset.phoneId)
      openEditModal(phoneId)
    })
  })
}

// ============================================
// MOBILE CARDS RENDERING
// ============================================

function renderMobileCards(filteredPhones = phones) {
  const container = document.getElementById("mobile-cards")

  const phonesToRender = [...filteredPhones]
  if (sortColumn && sortDirection) {
    phonesToRender.sort((a, b) => {
      let aVal = a[sortColumn] || ""
      let bVal = b[sortColumn] || ""

      if (typeof aVal === "string") aVal = aVal.toLowerCase()
      if (typeof bVal === "string") bVal = bVal.toLowerCase()

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  container.innerHTML = phonesToRender
    .map(
      (phone) => `
        <div 
            data-phone-id="${phone.id}"
            class="glass rounded-xl p-6 border-2 border-cyan-400/30 hover-lift cursor-pointer fade-in"
        >
            <div class="flex items-start gap-4">
                <img src="${getPhoneImage(phone.model)}" alt="${phone.model}" class="w-20 h-20 object-contain rounded-lg border border-cyan-400/30">
                <div class="flex-1">
                    <h3 class="text-lg font-bold text-cyan-400 mb-2">${phone.model}</h3>
                    ${getStatusBadge(phone.status)}
                </div>
            </div>
            <div class="mt-4 space-y-2 text-sm">
                <div class="flex justify-between">
                    <span class="text-cyan-400/70">MAC:</span>
                    <span class="text-cyan-100 font-mono">${phone.mac}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-cyan-400/70">IP:</span>
                    <span class="text-cyan-100 font-mono">${phone.ip || "-"}</span>
                </div>
                ${
                  phone.user
                    ? `
                <div class="flex justify-between">
                    <span class="text-cyan-400/70">Пользователь:</span>
                    <span class="text-cyan-100">${phone.user}</span>
                </div>
                `
                    : ""
                }
                ${
                  phone.department
                    ? `
                <div class="flex justify-between">
                    <span class="text-cyan-400/70">Отдел:</span>
                    <span class="text-cyan-100">${phone.department}</span>
                </div>
                `
                    : ""
                }
            </div>
        </div>
    `,
    )
    .join("")

  container.querySelectorAll("[data-phone-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const phoneId = Number.parseInt(card.dataset.phoneId)
      openEditModal(phoneId)
    })
  })
}

// ============================================
// SORTING
// ============================================

function handleSort(column) {
  if (sortColumn === column) {
    // Cycle through: asc -> desc -> null
    if (sortDirection === "asc") {
      sortDirection = "desc"
    } else if (sortDirection === "desc") {
      sortColumn = null
      sortDirection = null
    }
  } else {
    sortColumn = column
    sortDirection = "asc"
  }

  const filtered = getFilteredPhones()
  renderTable(filtered)
  renderMobileCards(filtered)
}

// ============================================
// COLUMN VISIBILITY
// ============================================

function toggleColumnVisibility(columnId) {
  const column = columns.find((col) => col.id === columnId)
  if (column) {
    column.visible = false
    saveData()

    const filtered = getFilteredPhones()
    renderTable(filtered)
    renderMobileCards(filtered)
  }
}

function toggleHiddenColumnsDropdown() {
  const dropdown = document.getElementById("hidden-columns-dropdown")
  const hiddenColumns = columns.filter((col) => !col.visible)

  if (hiddenColumns.length === 0) {
    showNotification("Все столбцы уже отображаются")
    return
  }

  if (dropdown.classList.contains("hidden")) {
    // Show dropdown
    dropdown.innerHTML = hiddenColumns
      .map(
        (col) => `
        <button 
          class="w-full text-left px-4 py-3 text-cyan-100 hover:bg-cyan-400/20 transition-colors border-b border-cyan-400/20 last:border-b-0"
          data-show-column="${col.id}"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <span>${col.label}</span>
          </div>
        </button>
      `,
      )
      .join("")

    dropdown.classList.remove("hidden")

    // Add click listeners to show column buttons
    dropdown.querySelectorAll("[data-show-column]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const columnId = btn.dataset.showColumn
        showColumn(columnId)
        dropdown.classList.add("hidden")
      })
    })

    // Close dropdown when clicking outside
    setTimeout(() => {
      document.addEventListener("click", closeDropdownOnClickOutside)
    }, 0)
  } else {
    dropdown.classList.add("hidden")
    document.removeEventListener("click", closeDropdownOnClickOutside)
  }
}

function closeDropdownOnClickOutside(e) {
  const dropdown = document.getElementById("hidden-columns-dropdown")
  const addBtn = document.getElementById("add-column-btn")

  if (!dropdown.contains(e.target) && e.target !== addBtn && !addBtn.contains(e.target)) {
    dropdown.classList.add("hidden")
    document.removeEventListener("click", closeDropdownOnClickOutside)
  }
}

function showColumn(columnId) {
  const column = columns.find((col) => col.id === columnId)
  if (column) {
    column.visible = true
    saveData()

    showNotification(`Столбец "${column.label}" добавлен`)

    const filtered = getFilteredPhones()
    renderTable(filtered)
    renderMobileCards(filtered)
  }
}

// ============================================
// SEARCH AND FILTER
// ============================================

function getFilteredPhones() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase()
  const statusFilter = document.getElementById("status-filter").value

  return phones.filter((phone) => {
    const matchesSearch = Object.values(phone).some((value) => String(value).toLowerCase().includes(searchTerm))
    const matchesStatus = statusFilter === "all" || phone.status === statusFilter
    return matchesSearch && matchesStatus
  })
}

document.getElementById("search-input").addEventListener("input", () => {
  const filtered = getFilteredPhones()
  renderTable(filtered)
  renderMobileCards(filtered)
})

document.getElementById("status-filter").addEventListener("change", () => {
  const filtered = getFilteredPhones()
  renderTable(filtered)
  renderMobileCards(filtered)
})

// ============================================
// CURSOR GLOW EFFECT
// ============================================

const cursorGlow = document.getElementById("cursor-glow")
document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px"
  cursorGlow.style.top = e.clientY + "px"
})

// ============================================
// INITIALIZATION
// ============================================

function init() {
  applyTheme()
  updateStatistics()
  renderActivityLog()
  renderTable()
  renderMobileCards()

  // Show table on desktop, cards on mobile
  function handleResize() {
    const table = document.getElementById("phones-table").parentElement.parentElement
    const cards = document.getElementById("mobile-cards")

    if (window.innerWidth >= 1024) {
      table.style.display = "block"
      cards.style.display = "none"
    } else {
      table.style.display = "none"
      cards.style.display = "block"
    }
  }

  handleResize()
  window.addEventListener("resize", handleResize)
}

init()

// ============================================
// EDIT MODAL MANAGEMENT
// ============================================

function openEditModal(phoneId) {
  const phone = phones.find((p) => p.id === phoneId)
  if (!phone) return

  const modal = document.getElementById("edit-modal")
  const form = document.getElementById("edit-form")
  const fieldsContainer = document.getElementById("edit-fields-container")
  const phoneImage = document.getElementById("phone-image")

  document.getElementById("edit-id").value = phone.id
  phoneImage.src = getPhoneImage(phone.model)

  const originalPhone = { ...phone }

  const visibleColumns = columns.filter((col) => col.visible)
  fieldsContainer.innerHTML = visibleColumns
    .map(
      (col) => `
        <div>
            <label class="block text-cyan-400 text-sm font-bold mb-2">${col.label}</label>
            ${
              col.id === "status"
                ? `
                <select name="${col.id}" class="w-full bg-black/30 border border-cyan-400/30 rounded-lg px-4 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none">
                    <option value="free" ${phone.status === "free" ? "selected" : ""}>Свободен</option>
                    <option value="assigned" ${phone.status === "assigned" ? "selected" : ""}>Выдан</option>
                    <option value="broken" ${phone.status === "broken" ? "selected" : ""}>Поломан</option>
                </select>
            `
                : col.id === "notes"
                  ? `
                <textarea name="${col.id}" rows="3" class="w-full bg-black/30 border border-cyan-400/30 rounded-lg px-4 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none resize-none">${phone[col.id] || ""}</textarea>
            `
                  : `
                <input type="text" name="${col.id}" value="${phone[col.id] || ""}" class="w-full bg-black/30 border border-cyan-400/30 rounded-lg px-4 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none">
            `
            }
        </div>
    `,
    )
    .join("")

  modal.classList.remove("hidden")
  modal.classList.add("flex")

  form.onsubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    const changes = []

    visibleColumns.forEach((col) => {
      const newValue = formData.get(col.id) || ""
      const oldValue = originalPhone[col.id] || ""

      if (newValue !== oldValue) {
        changes.push({ field: col.label, oldValue, newValue })
      }

      phone[col.id] = newValue
    })

    if (changes.length > 0) {
      const statusChange = changes.find((c) => c.field === "Статус")
      const userChange = changes.find((c) => c.field === "Пользователь")

      if (statusChange) {
        const statusLabels = {
          free: "свободен",
          assigned: "выдан",
          broken: "в ремонте",
        }
        logActivity(
          "изменен статус:",
          phone.model,
          `${statusLabels[statusChange.oldValue] || statusChange.oldValue} → ${statusLabels[statusChange.newValue] || statusChange.newValue}`,
        )
      } else if (userChange) {
        if (userChange.newValue && !userChange.oldValue) {
          logActivity("выдан пользователю:", phone.model, userChange.newValue)
        } else if (!userChange.newValue && userChange.oldValue) {
          logActivity("возвращен от:", phone.model, userChange.oldValue)
        } else {
          logActivity("изменен пользователь:", phone.model, `${userChange.oldValue} → ${userChange.newValue}`)
        }
      } else {
        logActivity("отредактирован", phone.model, `изменено полей: ${changes.length}`)
      }
    }

    saveData()
    updateStatistics()
    renderTable(getFilteredPhones())
    renderMobileCards(getFilteredPhones())
    modal.classList.add("hidden")
    modal.classList.remove("flex")
    showNotification("Изменения сохранены")
  }

  document.getElementById("delete-phone-btn").onclick = () => {
    if (confirm("Удалить этот телефон?")) {
      const index = phones.findIndex((p) => p.id === phone.id)
      if (index > -1) {
        logActivity("удален", phone.model)
        phones.splice(index, 1)
        saveData()
        updateStatistics()
        renderTable(getFilteredPhones())
        renderMobileCards(getFilteredPhones())
        modal.classList.add("hidden")
        modal.classList.remove("flex")
        showNotification("Телефон удален")
      }
    }
  }

  document.getElementById("close-modal").onclick = () => {
    modal.classList.add("hidden")
    modal.classList.remove("flex")
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden")
      modal.classList.remove("flex")
    }
  }
}

// ============================================
// DRAG AND DROP FOR COLUMNS
// ============================================

let draggedElement = null
let draggedIndex = null

function handleDragStart(e) {
  draggedElement = e.target
  draggedIndex = Number.parseInt(e.target.dataset.index)
  e.target.classList.add("dragging")
  e.dataTransfer.effectAllowed = "move"
}

function handleDragOver(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = "move"

  const target = e.target.closest("th")
  if (target && target !== draggedElement) {
    target.classList.add("drag-over")
  }
}

function handleDrop(e) {
  e.preventDefault()

  const target = e.target.closest("th")
  if (target && target !== draggedElement) {
    const targetIndex = Number.parseInt(target.dataset.index)

    // Reorder columns
    const visibleColumns = columns.filter((col) => col.visible)
    const [movedColumn] = visibleColumns.splice(draggedIndex, 1)
    visibleColumns.splice(targetIndex, 0, movedColumn)

    // Update columns array
    const hiddenColumns = columns.filter((col) => !col.visible)
    columns = [...visibleColumns, ...hiddenColumns]

    saveData()
    renderTable(getFilteredPhones())
    renderMobileCards(getFilteredPhones())
  }

  target?.classList.remove("drag-over")
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging")
  document.querySelectorAll("th").forEach((th) => th.classList.remove("drag-over"))
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message) {
  const notification = document.createElement("div")
  notification.className =
    "fixed bottom-4 right-4 glass border-2 border-yellow-400 text-yellow-400 px-6 py-4 rounded-lg neon-glow z-50 fade-in"
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${message}</span>
      <button class="ml-4 text-yellow-400 hover:text-cyan-400" onclick="this.parentElement.parentElement.remove()">✕</button>
    </div>
  `
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 5000)
}

// ============================================
// STATUS BADGE
// ============================================

function getStatusBadge(status) {
  switch (status) {
    case "free":
      return `<span class="bg-emerald-400 text-white px-2 py-1 rounded text-xs font-bold">Свободен</span>`
    case "assigned":
      return `<span class="bg-magenta-400 text-white px-2 py-1 rounded text-xs font-bold">Выдан</span>`
    case "broken":
      return `<span class="bg-red-400 text-white px-2 py-1 rounded text-xs font-bold">Поломан</span>`
    default:
      return `<span class="bg-gray-400 text-white px-2 py-1 rounded text-xs font-bold">Неизвестно</span>`
  }
}
