export class CustomEvent<T> {
    private subscribers: ((data: T) => void)[] = [];

    subscribe(callback: (data: T) => void): void {
        this.subscribers.push(callback);
    }
    emit(data: T): void {
        this.subscribers.forEach(callback => callback(data));
    }
}
