import axios from "axios";

const API_URL = "http://localhost:8000";

export class ModelApi<TModel, TModelCreate, TModelUpdate> {
  constructor(private endpoint: string) {}

  async get() {
    const response = await axios.get<TModel[]>(`${API_URL}${this.endpoint}/`);
    return response.data;
  }

  async getById(id: number) {
    const response = await axios.get<TModel>(`${API_URL}${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data: TModelCreate) {
    const response = await axios.post<TModel>(`${API_URL}${this.endpoint}`, data);
    return response.data;
  }

  async update(id: number, data: TModelUpdate) {
    const response = await axios.put<TModel>(`${API_URL}${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: number) {
    const response = await axios.delete(`${API_URL}${this.endpoint}/${id}`);
    return response.data;
  }
}