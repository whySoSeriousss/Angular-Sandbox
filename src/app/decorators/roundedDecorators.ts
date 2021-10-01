export function roundedDecorator(defaultValue: number = 0) {
    return (target: any, name: PropertyKey): any => {
        let _val = target[name];
        const descriptor = {
            get(this: any){
                if (_val !== null || _val !== undefined) {
                    return _val;
                }
                return Math.round(defaultValue);
            },
            set(value: any){
                _val = Math.round(value);
            }
        };
        Object.defineProperty(target, name, descriptor);
    };
}