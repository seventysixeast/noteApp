import http from "../http-common";
import INoteData from "../types/Note";

const getAll = () => {
  return http.get<Array<INoteData>>("/notes");
};

const get = (id: any) => {
  return http.get<INoteData>(`/notes/${id}`);
};

const create = (data: INoteData) => {
  return http.post<INoteData>("/notes", data);
};

const update = (id: any, data: INoteData) => {
  return http.put<any>(`/notes/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/notes/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/notes`);
};

const findByTitle = (title: string) => {
  return http.get<Array<INoteData>>(`/notes?title=${title}`);
};

const NoteService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default NoteService;
