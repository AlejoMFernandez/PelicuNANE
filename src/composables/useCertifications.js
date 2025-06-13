import { ref, onMounted } from 'vue';

export function useCertifications() {
  const certifications = ref([
    'G', 'PG', 'PG-13', 'R', 'NC-17', 'A', 'B', 'C', 'D', 'ATP', 'SAM13', 'SAM16', 'SAM18'
  ]);
  // Puedes personalizar este array según el país o la API
  return { certifications };
}
