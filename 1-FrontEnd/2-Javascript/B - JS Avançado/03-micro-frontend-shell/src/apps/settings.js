export function mount(container) {
    container.innerHTML = `
        <div class="app-card">
            <h2>⚙️ Settings Micro-App</h2>
            <p>Configure suas preferências de sistema aqui.</p>
            <div class="input-group">
                <label>Tema:</label>
                <select>
                    <option>Dark Mode (Default)</option>
                    <option>Light Mode</option>
                    <option>Cyberpunk</option>
                </select>
            </div>
        </div>
    `;
}
