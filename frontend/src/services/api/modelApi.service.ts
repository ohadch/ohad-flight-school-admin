import axios from "axios";

const API_URL = "http://localhost:8000";

export class ModelApi<TModel> {
  constructor(private endpoint: string) {}

  async get(params?: Partial<TModel>) {
    return await axios.get<TModel[]>(`${API_URL}${this.endpoint}`, { params });
  }

  async getById(id: number) {
    return await axios.get<TModel>(`${API_URL}${this.endpoint}/${id}`);
  }

  async create(data: Partial<TModel>) {
    return await axios.post<TModel>(`${API_URL}${this.endpoint}`, data);
  }

  async update(id: number, data: Partial<TModel>) {
    return await axios.put<TModel>(`${API_URL}${this.endpoint}/${id}`, data);
  }

  async delete(id: number) {
    return await axios.delete(`${API_URL}${this.endpoint}/${id}`);
  }
}