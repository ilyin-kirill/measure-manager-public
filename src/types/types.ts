export interface ICustomInputProps<T> {
    type?: string;
    style?: object;
    label: string;
    extraLabel?: string;
    value?: string;
    placeholder?: string;
    data?: string[];
    blue?: boolean;
    onChange: (e: React.ChangeEvent<T>) => void;
    setShowLogin?: (show: boolean) => void;
    setShowResetPass?: (show: boolean) => void;
}

export interface IData {
    color: string,
    name: string,
    value: number
}

export interface IBarData {
    months: object[];
    name: string;
}

interface IWellsOnStatus {
    subsidiary: string;
    bush: string;
    well: string;
}

export interface IWellData {
    name: string;
    latest_activity?: string;
    color?: string;
    pending: IWellsOnStatus[];
    in_drilling: IWellsOnStatus[];
    drilled: IWellsOnStatus[];
}

export interface IUser {
    name?: string;
    surname?: string;
    organization?: string;
    role?: string;
    email: string;
    status?: number;
}

export interface IAuth {
    isAuthenticated: boolean;
}

export interface ICardProps<T> {
    data: T;
    page: number;
    setPage: (index: number) => void;
    length: number;
}