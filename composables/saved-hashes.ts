export function useSavedHashes() {
  const savedHashes = useLocalStorage<string[]>(STORAGE_KEY, []);

  return {
    savedHashes,
  };
}
