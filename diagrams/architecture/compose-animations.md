# Интеграция Jetpack Compose с анимациями (Enhanced)

## Примеры кода анимаций

```kotlin
// GlitchEffect.kt
@Composable
fun GlitchEffect(
    modifier: Modifier = Modifier,
    isActive: Boolean,
    content: @Composable () -> Unit
) {
    val infiniteTransition = rememberInfiniteTransition()
    
    val offsetX by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = if (isActive) 10f else 0f,
        animationSpec = infiniteRepeatable(
            animation = tween(100),
            repeatMode = RepeatMode.Reverse
        )
    )
    
    val offsetY by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = if (isActive) 5f else 0f,
        animationSpec = infiniteRepeatable(
            animation = tween(150),
            repeatMode = RepeatMode.Reverse
        )
    )
    
    val alpha by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = if (isActive) 0.8f else 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(200),
            repeatMode = RepeatMode.Reverse
        )
    )
    
    Box(
        modifier = modifier
            .offset(x = offsetX.dp, y = offsetY.dp)
            .alpha(alpha)
    ) {
        content()
        
        // Дополнительные глич-слои
        if (isActive) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .offset(x = (-offsetX * 0.5f).dp)
                    .alpha(0.3f)
                    .background(Color.Red.copy(alpha = 0.1f))
            )
            
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .offset(x = (offsetX * 0.7f).dp)
                    .alpha(0.2f)
                    .background(Color.Blue.copy(alpha = 0.1f))
            )
        }
    }
}
```

```kotlin
// MessageAnimation.kt
@Composable
fun AnimatedMessageBubble(
    message: ChatMessage,
    modifier: Modifier = Modifier
) {
    var visible by remember { mutableStateOf(false) }
    
    LaunchedEffect(message) {
        visible = true
    }
    
    AnimatedVisibility(
        visible = visible,
        enter = slideInVertically(
            initialOffsetY = { it },
            animationSpec = tween(300)
        ) + fadeIn(animationSpec = tween(300)),
        modifier = modifier
    ) {
        val scale by animateFloatAsState(
            targetValue = if (message.isImportant) 1.05f else 1f,
            animationSpec = spring(
                dampingRatio = Spring.DampingRatioMediumBouncy,
                stiffness = Spring.StiffnessLow
            )
        )
        
        GlitchEffect(
            isActive = message.isGlitch,
            modifier = Modifier.scale(scale)
        ) {
            MessageBubbleContent(message = message)
        }
    }
}
```

```kotlin
// TypingAnimation.kt
@Composable
fun TypingIndicator(
    modifier: Modifier = Modifier,
    isVisible: Boolean = true
) {
    AnimatedVisibility(
        visible = isVisible,
        enter = fadeIn() + slideInVertically(),
        exit = fadeOut() + slideOutVertically()
    ) {
        Row(
            modifier = modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            repeat(3) { index ->
                val infiniteTransition = rememberInfiniteTransition()
                val alpha by infiniteTransition.animateFloat(
                    initialValue = 0.3f,
                    targetValue = 1f,
                    animationSpec = infiniteRepeatable(
                        animation = tween(600, delayMillis = index * 200),
                        repeatMode = RepeatMode.Reverse
                    )
                )
                
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .background(
                            Color.Gray.copy(alpha = alpha),
                            CircleShape
                        )
                )
            }
        }
    }
}
```

```kotlin
// GameTransitions.kt
@Composable
fun GameDayTransition(
    currentDay: Int,
    onTransitionComplete: () -> Unit,
    modifier: Modifier = Modifier
) {
    var showTransition by remember { mutableStateOf(true) }
    
    LaunchedEffect(currentDay) {
        showTransition = true
        delay(2000)
        showTransition = false
        onTransitionComplete()
    }
    
    AnimatedVisibility(
        visible = showTransition,
        enter = fadeIn(animationSpec = tween(500)),
        exit = fadeOut(animationSpec = tween(500))
    ) {
        Box(
            modifier = modifier
                .fillMaxSize()
                .background(Color.Black),
            contentAlignment = Alignment.Center
        ) {
            val scale by animateFloatAsState(
                targetValue = 1f,
                animationSpec = spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy,
                    stiffness = Spring.StiffnessLow
                )
            )
            
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.scale(scale)
            ) {
                Text(
                    text = "ДЕНЬ $currentDay",
                    fontSize = 48.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                LinearProgressIndicator(
                    modifier = Modifier.width(200.dp),
                    color = Color.Red
                )
            }
        }
    }
}
```

## Реализация в проекте
- **Описание**: 
- **Реализация**: 

## Взаимодействие с командой
- **Android-разработчик (Kotlin)**: Реализует анимации в Jetpack Compose.
- **UI/UX-дизайнер**: Проектирует сценарии анимаций и взаимодействие пользователя.
- **2D-художник**: Создаёт графические элементы для анимаций.
- **QA-аналитик**: Тестирует плавность и корректность анимаций.
- **Технический писатель**: Документирует сценарии и параметры анимаций.

## Кому подходит
- Подходит для Android-разработчиков и UI/UX-дизайнеров.
- Полезно для 2D-художников при создании ассетов.
- Рекомендуется для новых членов команды для понимания архитектуры анимаций.

## Аспекты работы
- Требует тестирования производительности на разных устройствах.
- Важно поддерживать плавность и отзывчивость анимаций.
- Необходимо учитывать адаптивность интерфейса.
- Документация должна включать примеры и параметры анимаций.

## Текстовая схема (Mermaid/PlantUML)
```mermaid
<!-- Вставьте код диаграммы из compose-animations.mmd -->
``` 