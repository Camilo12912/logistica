import cors from "cors";
import helmet from "helmet";

export function configuracionSeguridad(app) {
    app.use(cors());
    app.use(helmet());
}
