export interface PaginationLink {
  url: string;
  label: string;
  active: boolean;
}

export interface Pagination {
  links: PaginationLink[];
}

export const paginationInit: Pagination
