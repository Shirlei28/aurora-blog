import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedNotes() {
  const notes = await getCollection('notes');
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export type Note = CollectionEntry<'notes'>;
