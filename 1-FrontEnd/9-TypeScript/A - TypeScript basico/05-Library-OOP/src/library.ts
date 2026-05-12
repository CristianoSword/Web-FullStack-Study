import { BaseItem, Member } from "./models";

export class Library {
    private items: BaseItem[] = [];
    private members: Member[] = [];

    addItem(item: BaseItem): void {
        this.items.push(item);
    }

    addMember(member: Member): void {
        this.members.push(member);
    }

    lendItem(itemId: string, memberId: string): boolean {
        const item = this.items.find(i => i.id === itemId);
        const member = this.members.find(m => m.id === memberId);

        if (item && member && item.availability) {
            item.toggleAvailability();
            member.borrow(item);
            console.log(`[Library] ${item.title} emprestado para ${member.name}`);
            return true;
        }

        console.log(`[Library] Falha ao emprestar item ${itemId}`);
        return false;
    }

    listAvailableItems(): BaseItem[] {
        return this.items.filter(i => i.availability);
    }
}
