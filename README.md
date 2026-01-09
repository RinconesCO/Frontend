# FrontRedSocialBogota

**Propósito:** Proyecto frontend creado con Vite + React (TypeScript). Este `README` explica qué instalar y cómo agregar/usar React y Tailwind CSS en este repositorio.

**Prerequisitos:**
- **Node.js:** versión 16 o superior (recomendada: 18+).
- **Gestor de paquetes:** `npm` (v8+), `yarn` o `pnpm`.

**Rápido — comandos útiles**
- **Instalar dependencias:**

```powershell
npm install
# o con pnpm
pnpm install
# o con yarn
yarn
```

- **Arrancar servidor de desarrollo:**

```powershell
npm run dev
# o
pnpm dev
# o
yarn dev
```

- **Construir para producción:**

```powershell
npm run build
# o
pnpm build
# o
yarn build
```

- **Previsualizar build (Vite):**

```powershell
npm run preview
# o
pnpm preview
# o
yarn preview
```

**¿Cómo (re)instalar React en un proyecto existente?**
Si por algún motivo React no está instalado o necesitas añadirlo manualmente:

```powershell
npm install react react-dom
npm install -D @types/react @types/react-dom  # si usas TypeScript
```

Con `yarn`:

```powershell
yarn add react react-dom
yarn add -D @types/react @types/react-dom
```

Con `pnpm`:

```powershell
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom
```

Después de instalar, asegúrate de que el punto de entrada (`src/main.tsx` o `src/main.jsx`) importe el CSS principal (por ejemplo `import './index.css'`), y arranca el servidor de desarrollo.

**Instalar y configurar Tailwind CSS (Vite + React)**
1. Instala Tailwind y sus dependencias PostCSS/Autoprefixer:

```powershell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

(Con `pnpm` / `yarn` cambia el gestor: `pnpm add -D ...`, `yarn add -D ...`).

2. El comando `npx tailwindcss init -p` creará `tailwind.config.js` y `postcss.config.js` si no existen. Asegúrate de que en `tailwind.config.js` la opción `content` incluya tus rutas, por ejemplo:

```js
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: { extend: {} },
	plugins: [],
}
```

3. Importa las directivas de Tailwind en tu CSS principal (`src/index.css` o `src/styles.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Reinicia el servidor de desarrollo. Ya puedes usar clases de Tailwind en tus componentes React.

Ejemplo rápido en `src/App.tsx`:

```tsx
export default function App() {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<h1 className="text-3xl font-bold text-blue-600">Hola, Tailwind + React!</h1>
		</div>
	);
}
```

**Notas y comprobaciones**
- Si ya existe `tailwind.config.js` y `postcss.config.js` en este repositorio, probablemente Tailwind ya está configurado; comprueba que `src/index.css` contiene las directivas `@tailwind`.
- Si usas TypeScript, instala también los tipos para React si no están presentes (`@types/react`, `@types/react-dom`).
- Para depurar problemas con estilos, limpia la cache y reinicia el servidor de Vite.

**Siguientes pasos sugeridos**
- Ejecutar `npm install` para instalar las dependencias del proyecto.
- Arrancar el servidor con `npm run dev` y abrir `http://localhost:5173`.
- Si quieres, puedo ejecutar `npm install` aquí y/o confirmar que Tailwind está activo en el proyecto.

---

Si quieres, actualizo este `README` para añadir instrucciones específicas del proyecto (por ejemplo: scripts personalizados, configuración de linters, o pasos para desplegar). ¿Quieres que ejecute `npm install` ahora o que haga un commit con este cambio?
