export default function to<T> (promise: Promise<T>) {
    return promise
        .then((data: T) => {
            return { error: undefined, data };
        })
        .catch((error: Error) => {
            return { error, data: undefined };
        });
}
