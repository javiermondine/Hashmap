# Hashmap

Implementación en JavaScript de un HashMap simple con manejo de colisiones (buckets con arrays), rehashing (doblar capacidad) y un HashSet extra para crédito adicional.

Características:
- Función hash con `%` dentro del loop para evitar overflow en keys largas.
- Buckets: arreglo de arrays, cada bucket almacena pares [key, value].
- Redimensionamiento automático cuando size/capacity > loadFactor (por defecto 0.75).

Métodos implementados:
- set(key, value)
- get(key)
- has(key)
- remove(key)
- length()
- clear()
- keys()
- values()
- entries()

Extra:
- `HashSet` (usa internamente `HashMap`) con `add`, `has`, `remove`, `clear`, `size`, `values`.

Prueba rápida:

```bash
node main.js
```

Esto ejecutará un conjunto de pruebas que comprueban la inserción, sobrescritura, rehashing y demás métodos.

Nota: Para simplificar el ejercicio las claves deben ser strings.
