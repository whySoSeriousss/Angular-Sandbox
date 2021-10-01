export function execTimeDecorator(target: Object, PropertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; //method has implementation, parameters
    descriptor.value = function(...args: any){ //args is an array of all params
        const start = new Date();
        const result = originalMethod.apply(this, args);
        const finish = new Date();
        console.log(`Method ${PropertyKey} execution timers was ${finish.getTime() - start.getTime()} milliseconds`);
        return result;
    }

    return descriptor;
}