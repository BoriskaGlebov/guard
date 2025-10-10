// ============================================
// DATA MANAGEMENT
// ============================================

// Default phone images for different models
const phoneImages = {
  Cisco: "/cisco-ip-phone-black-professional-office.jpg",
  Yealink: "/yealink-ip-phone-modern-sleek-design.jpg",
  Polycom: "/polycom-ip-phone-conference-system.jpg",
  default: "/generic-ip-phone-office-equipment.jpg",
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
  { id: "model", label: "Модель", visible: true },
  { id: "mac", label: "MAC адрес", visible: true },
  { id: "ip", label: "IP адрес", visible: true },
  { id: "status", label: "Статус", visible: true },
  { id: "user", label: "Пользователь", visible: true },
  { id: "department", label: "Отдел", visible: true },
  { id: "notes", label: "Примечания", visible: false },
]

// Load data from localStorage or use defaults
let phones = JSON.parse(localStorage.getItem("phones")) || defaultPhones
let columns = JSON.parse(localStorage.getItem("columns")) || defaultColumns
let theme = localStorage.getItem("theme") || "dark"

// Save data to localStorage
function saveData() {
  localStorage.setItem("phones", JSON.stringify(phones))
  localStorage.setItem("columns", JSON.stringify(columns))
}

// ============================================
// THEME MANAGEMENT
// ============================================

function applyTheme() {
  const body = document.body
  const themeToggle = document.getElementById("theme-toggle")
  const themeName = document.getElementById("theme-name")

  if (theme === "light") {
    body.classList.remove("bg-gradient-to-br", "from-[#0a0a0f]", "via-[#0f172a]", "to-[#1a1a2e]", "text-cyan-100")
    body.classList.add("bg-gradient-to-br", "from-slate-100", "via-blue-50", "to-purple-50", "text-slate-900")
    themeName.textContent = "ТЕХНО-СВЕТ"

    // Update glass elements
    document.querySelectorAll(".glass").forEach((el) => {
      el.classList.remove("glass")
      el.classList.add("glass-light")
    })
  } else {
    body.classList.remove("bg-gradient-to-br", "from-slate-100", "via-blue-50", "to-purple-50", "text-slate-900")
    body.classList.add("bg-gradient-to-br", "from-[#0a0a0f]", "via-[#0f172a]", "to-[#1a1a2e]", "text-cyan-100")
    themeName.textContent = "НЕОН ТЬМЫ"

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

  // Render headers with drag-and-drop
  headerRow.innerHTML = visibleColumns
    .map(
      (col, index) => `
        <th 
            draggable="true" 
            data-column-id="${col.id}"
            data-index="${index}"
            class="px-6 py-4 text-left text-cyan-400 font-bold uppercase tracking-wider cursor-move hover:bg-cyan-400/10 transition-colors"
        >
            ${col.label}
        </th>
    `,
    )
    .join("")

  // Add drag-and-drop listeners to headers
  const headers = headerRow.querySelectorAll("th")
  headers.forEach((header) => {
    header.addEventListener("dragstart", handleDragStart)
    header.addEventListener("dragover", handleDragOver)
    header.addEventListener("drop", handleDrop)
    header.addEventListener("dragend", handleDragEnd)
  })

  // Render rows
  tableBody.innerHTML = filteredPhones
    .map(
      (phone) => `
        <tr 
            data-phone-id="${phone.id}"
            class="border-b border-cyan-400/20 hover:bg-cyan-400/5 cursor-pointer transition-all hover-lift"
        >
            ${visibleColumns
              .map((col) => {
                if (col.id === "status") {
                  return `<td class="px-6 py-4">${getStatusBadge(phone.status)}</td>`
                }
                return `<td class="px-6 py-4 text-cyan-100">${phone[col.id] || "-"}</td>`
              })
              .join("")}
        </tr>
    `,
    )
    .join("")

  // Add click listeners to rows
  tableBody.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => {
      const phoneId = Number.parseInt(row.dataset.phoneId)
      openEditModal(phoneId)
    })
  })
}

function getStatusBadge(status) {
  const badges = {
    free: '<span class="status-badge bg-emerald-500/20 text-emerald-400 border border-emerald-400">Свободен</span>',
    assigned: '<span class="status-badge bg-magenta-500/20 text-magenta-400 border border-magenta-400">Выдан</span>',
    broken: '<span class="status-badge bg-red-500/20 text-red-400 border border-red-400">Поломан</span>',
  }
  return badges[status] || status
}

// ============================================
// MOBILE CARDS RENDERING
// ============================================

function renderMobileCards(filteredPhones = phones) {
  const container = document.getElementById("mobile-cards")

  container.innerHTML = filteredPhones
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

  // Add click listeners
  container.querySelectorAll("[data-phone-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const phoneId = Number.parseInt(card.dataset.phoneId)
      openEditModal(phoneId)
    })
  })
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
// SEARCH AND FILTER
// ============================================

function getFilteredPhones() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase()
  const statusFilter = document.getElementById("status-filter").value

  return phones.filter((phone) => {
    const matchesSearch =
      phone.model.toLowerCase().includes(searchTerm) ||
      phone.mac.toLowerCase().includes(searchTerm) ||
      (phone.ip && phone.ip.toLowerCase().includes(searchTerm)) ||
      (phone.user && phone.user.toLowerCase().includes(searchTerm)) ||
      (phone.department && phone.department.toLowerCase().includes(searchTerm))

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
// MODAL MANAGEMENT
// ============================================

function openEditModal(phoneId = null) {
  const modal = document.getElementById("edit-modal")
  const form = document.getElementById("edit-form")
  const deleteBtn = document.getElementById("delete-phone-btn")

  modal.classList.remove("hidden")
  modal.classList.add("flex")

  if (phoneId) {
    // Edit existing phone
    const phone = phones.find((p) => p.id === phoneId)
    document.getElementById("edit-id").value = phone.id
    document.getElementById("edit-model").value = phone.model
    document.getElementById("edit-mac").value = phone.mac
    document.getElementById("edit-ip").value = phone.ip || ""
    document.getElementById("edit-status").value = phone.status
    document.getElementById("edit-user").value = phone.user || ""
    document.getElementById("edit-department").value = phone.department || ""
    document.getElementById("edit-notes").value = phone.notes || ""
    document.getElementById("phone-image").src = getPhoneImage(phone.model)
    deleteBtn.style.display = "block"
  } else {
    // Add new phone
    form.reset()
    document.getElementById("edit-id").value = ""
    document.getElementById("phone-image").src = phoneImages.default
    deleteBtn.style.display = "none"
  }

  // Update image when model changes
  document.getElementById("edit-model").addEventListener("input", (e) => {
    document.getElementById("phone-image").src = getPhoneImage(e.target.value)
  })
}

function closeEditModal() {
  const modal = document.getElementById("edit-modal")
  modal.classList.add("hidden")
  modal.classList.remove("flex")
}

document.getElementById("close-modal").addEventListener("click", closeEditModal)
document.getElementById("edit-modal").addEventListener("click", (e) => {
  if (e.target.id === "edit-modal") closeEditModal()
})

// ============================================
// FORM SUBMISSION
// ============================================

document.getElementById("edit-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const id = document.getElementById("edit-id").value
  const phoneData = {
    model: document.getElementById("edit-model").value,
    mac: document.getElementById("edit-mac").value,
    ip: document.getElementById("edit-ip").value,
    status: document.getElementById("edit-status").value,
    user: document.getElementById("edit-user").value,
    department: document.getElementById("edit-department").value,
    notes: document.getElementById("edit-notes").value,
  }

  if (id) {
    // Update existing phone
    const index = phones.findIndex((p) => p.id === Number.parseInt(id))
    phones[index] = { ...phones[index], ...phoneData }
  } else {
    // Add new phone
    const newId = phones.length > 0 ? Math.max(...phones.map((p) => p.id)) + 1 : 1
    phones.push({ id: newId, ...phoneData })
  }

  saveData()
  updateStats()
  renderTable(getFilteredPhones())
  renderMobileCards(getFilteredPhones())
  closeEditModal()
})

// ============================================
// DELETE PHONE
// ============================================

document.getElementById("delete-phone-btn").addEventListener("click", () => {
  const id = Number.parseInt(document.getElementById("edit-id").value)
  if (confirm("Вы уверены, что хотите удалить этот телефон?")) {
    phones = phones.filter((p) => p.id !== id)
    saveData()
    updateStats()
    renderTable(getFilteredPhones())
    renderMobileCards(getFilteredPhones())
    closeEditModal()
  }
})

// ============================================
// ADD PHONE BUTTON
// ============================================

document.getElementById("add-phone-btn").addEventListener("click", () => {
  openEditModal()
})

// ============================================
// COLUMN SETTINGS
// ============================================

function openColumnModal() {
  const modal = document.getElementById("column-modal")
  const list = document.getElementById("column-list")

  list.innerHTML = columns
    .map(
      (col, index) => `
        <div 
            draggable="true"
            data-column-index="${index}"
            class="flex items-center gap-3 p-3 glass rounded-lg border border-yellow-400/30 cursor-move hover:bg-yellow-400/10 transition-all"
        >
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
            </svg>
            <label class="flex items-center gap-2 flex-1 cursor-pointer">
                <input 
                    type="checkbox" 
                    ${col.visible ? "checked" : ""} 
                    data-column-id="${col.id}"
                    class="w-5 h-5 rounded border-2 border-yellow-400 bg-black/30 text-yellow-400 focus:ring-2 focus:ring-yellow-400/50 cursor-pointer"
                >
                <span class="text-cyan-100 font-bold">${col.label}</span>
            </label>
        </div>
    `,
    )
    .join("")

  // Add checkbox listeners
  list.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const columnId = e.target.dataset.columnId
      const column = columns.find((col) => col.id === columnId)
      column.visible = e.target.checked
      saveData()
      renderTable(getFilteredPhones())
      renderMobileCards(getFilteredPhones())
    })
  })

  // Add drag-and-drop for column reordering
  const items = list.querySelectorAll("[data-column-index]")
  items.forEach((item) => {
    item.addEventListener("dragstart", handleColumnDragStart)
    item.addEventListener("dragover", handleColumnDragOver)
    item.addEventListener("drop", handleColumnDrop)
    item.addEventListener("dragend", handleColumnDragEnd)
  })

  modal.classList.remove("hidden")
  modal.classList.add("flex")
}

function closeColumnModal() {
  const modal = document.getElementById("column-modal")
  modal.classList.add("hidden")
  modal.classList.remove("flex")
}

let draggedColumnIndex = null

function handleColumnDragStart(e) {
  draggedColumnIndex = Number.parseInt(e.target.dataset.columnIndex)
  e.target.classList.add("dragging")
}

function handleColumnDragOver(e) {
  e.preventDefault()
  const target = e.target.closest("[data-column-index]")
  if (target) {
    target.classList.add("drag-over")
  }
}

function handleColumnDrop(e) {
  e.preventDefault()
  const target = e.target.closest("[data-column-index]")

  if (target && draggedColumnIndex !== null) {
    const targetIndex = Number.parseInt(target.dataset.columnIndex)

    // Reorder columns
    const [movedColumn] = columns.splice(draggedColumnIndex, 1)
    columns.splice(targetIndex, 0, movedColumn)

    saveData()
    renderTable(getFilteredPhones())
    renderMobileCards(getFilteredPhones())
    openColumnModal() // Re-render modal
  }

  target?.classList.remove("drag-over")
}

function handleColumnDragEnd(e) {
  e.target.classList.remove("dragging")
  document.querySelectorAll("[data-column-index]").forEach((item) => {
    item.classList.remove("drag-over")
  })
}

document.getElementById("column-settings-btn").addEventListener("click", openColumnModal)
document.getElementById("close-column-modal").addEventListener("click", closeColumnModal)
document.getElementById("column-modal").addEventListener("click", (e) => {
  if (e.target.id === "column-modal") closeColumnModal()
})

// ============================================
// CSV EXPORT
// ============================================

document.getElementById("export-csv-btn").addEventListener("click", () => {
  const visibleColumns = columns.filter((col) => col.visible)
  const headers = visibleColumns.map((col) => col.label).join(",")
  const rows = phones
    .map((phone) =>
      visibleColumns
        .map((col) => {
          const value = phone[col.id] || ""
          return `"${value}"`
        })
        .join(","),
    )
    .join("\n")

  const csv = `${headers}\n${rows}`
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `ip-phones-${new Date().toISOString().split("T")[0]}.csv`
  link.click()
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
  updateStats()
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
