export class User {
    public constructor(
        public email?: string,
        public password?: string,
        public rememberme?: boolean,
        public loading: boolean = false
    ) {}
}
