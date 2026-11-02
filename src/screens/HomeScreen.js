/**
 * HomeScreen
 * Pantalla inicial del conductor (pestaña Home).
 * Primera entrega: vacía, sin mapa, sin viajes y sin estado de disponibilidad.
 */
import ScreenPlaceholder from '../components/ScreenPlaceholder';

export default function HomeScreen() {
  return (
    <ScreenPlaceholder
      title="Inicio"
      description="Próximamente se mostrará la información operativa del conductor:
                    Estado de conexión
                  - Solicitudes de viaje
                  - Viajes activos
                  - Ganancias del día."
    />
  );
}
