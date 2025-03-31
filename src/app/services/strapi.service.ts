import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Ajusta según tus necesidades de datos
export interface Article {
  id?: number;
  title: string;
  content: string;
  // etc.
}

// Estructura típica de Strapi: "data" y "meta"
interface StrapiResponse<T> {
  data: { id: number; attributes: T }[];
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  // Ajusta la URL base a tu endpoint de Strapi:
  // Por defecto corre en http://localhost:1337
  // y la colección "articles" en /api/articles
  private baseUrl = 'http://localhost:1337/api/articles';

  // Si necesitas un token JWT de Strapi para peticiones autenticadas,
  // podrías guardarlo aquí o en un servicio de Auth.
  // private token = 'tu_token_jwt';

  constructor(private http: HttpClient) {}

  // GET: Obtener todos los artículos de Strapi
  getAllArticles(): Observable<Article[]> {
    return this.http.get<StrapiResponse<Omit<Article, 'id'>>>(this.baseUrl).pipe(
      map((response) =>
        response.data.map((item) => {
          return {
            id: item.id,
            ...item.attributes
          };
        })
      )
    );
  }

  // GET: Obtener un artículo por ID
  getArticleById(id: number): Observable<Article> {
    return this.http
      .get<{ data: { id: number; attributes: Omit<Article, 'id'> } }>(
        `${this.baseUrl}/${id}`
      )
      .pipe(
        map((response) => {
          const { id: itemId, attributes } = response.data;
          return { id: itemId, ...attributes };
        })
      );
  }

  // POST: Crear un nuevo artículo
  createArticle(article: Omit<Article, 'id'>): Observable<any> {
    // La forma de enviar datos a Strapi es { data: { ... } } 
    const body = { data: article };
    // Opcionalmente, si requieres auth, incluirías los headers con tu token:
    // const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    // return this.http.post(this.baseUrl, body, { headers });

    return this.http.post(this.baseUrl, body);
  }

  // PUT: Actualizar un artículo
  updateArticle(id: number, article: Partial<Article>): Observable<any> {
    const body = { data: article };
    return this.http.put(`${this.baseUrl}/${id}`, body);
  }

  // DELETE: Eliminar un artículo
  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
