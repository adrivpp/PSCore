export interface ProductParams {
    name: string;
    inStock?: boolean;
    description?: string;
    price: number;
    category: string;
}

export interface Product {
    _id: string;
    name: string;
    inStock: boolean;
    description?: string;
    price: number;
    category: string;
}

export interface PaginatedProducts {
    total: number;
    items: Product[]
}