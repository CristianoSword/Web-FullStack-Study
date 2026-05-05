/**
 * BasePlugin
 * Classe abstrata (via contrato) que todos os plugins devem estender
 */
export class BasePlugin {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }

    // Método obrigatório que o Core chamará
    init(container) {
        throw new Error(`O plugin ${this.name} deve implementar o método init()`);
    }

    // Utilitário para renderização interna
    render(container, html) {
        container.innerHTML = html;
    }
}
