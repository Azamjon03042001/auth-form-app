import { Box, Typography } from "@mui/material";
import React from "react";

const ProjectDescription = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
      Что умеет этот проект
    </Typography>
    <Typography variant="body1" paragraph>
      • Регистрация и вход по email/паролю с валидацией и подтверждением пароля.
      <br />
      • Защищённые маршруты: доступ к личному Dashboard только после
      авторизации.
      <br />
      • Сохранение сессии в localStorage (не вылетает при перезагрузке).
      <br />
      • Смена темы интерфейса (светлая/тёмная) с кнопкой‑переключателем.
      <br />
      • Уведомления об ошибках и успехах через красивые Snackbar.
      <br />• Адаптивная вёрстка и Material UI-компоненты для чистого UI.
    </Typography>
    <Typography variant="body1">
      Этот проект служит примером полноценной SPA с аутентификацией и может быть
      легко встроен в любое портфолио или админ‑панель.
    </Typography>
  </Box>
);

export default ProjectDescription;
