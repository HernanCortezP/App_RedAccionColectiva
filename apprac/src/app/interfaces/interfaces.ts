export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
  }

export interface Post {
    imgs?: string[];
    _id?: string;
    mensaje?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
    tipo?: string;
  }

export interface Usuario {
    avatar?: string;
    _id?: string;
    nombre?: string;
    email?: string;
    password?: string;
}
