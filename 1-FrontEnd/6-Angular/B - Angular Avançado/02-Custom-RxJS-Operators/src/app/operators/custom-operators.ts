import { Observable, pipe, UnaryFunction } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { MouseCoordinates } from '../models/reactive.models';

interface MouseSpeedAccumulator {
  lastPos: MouseCoordinates | null;
  lastTime: number;
  speed: number;
}

export function calculateSpeed(): UnaryFunction<Observable<MouseCoordinates>, Observable<number>> {
  return pipe(
    scan<MouseCoordinates, MouseSpeedAccumulator>(
      (acc, pos) => {
        const now = Date.now();
        if (!acc.lastPos) {
          return { lastPos: pos, lastTime: now, speed: 0 };
        }
        const dx = pos.x - acc.lastPos.x;
        const dy = pos.y - acc.lastPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const dt = now - acc.lastTime || 1;
        const speed = distance / dt; // pixels per ms
        return { lastPos: pos, lastTime: now, speed };
      },
      { lastPos: null, lastTime: 0, speed: 0 }
    ),
    map(acc => parseFloat((acc.speed * 10).toFixed(1))) // Scale for friendly dashboard metrics
  );
}
