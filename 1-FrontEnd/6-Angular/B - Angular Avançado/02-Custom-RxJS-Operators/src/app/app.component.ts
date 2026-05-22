import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, fromEvent, merge, BehaviorSubject, Subscription, Observable } from 'rxjs';
import { throttleTime, map, filter, tap } from 'rxjs/operators';
import { StreamLogItem, MouseCoordinates } from './models/reactive.models';
import { calculateSpeed } from './operators/custom-operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="reactive-wrapper">
      <header class="app-header">
        <div class="brand">
          <span class="brand-icon">🔮</span>
          <h1>AURA<span class="highlight">RxJS</span></h1>
        </div>
        <p class="subtitle">Console de programação reativa e monitoramento assíncrono avançado.</p>
      </header>

      <div class="main-layout">
        <!-- Left: Reactive Playground & Tracking -->
        <section class="playground-section">
          <!-- Tracking Board -->
          <div 
            #trackingArea 
            class="tracking-card"
          >
            <div class="card-header">
              <h3>Área de Rastreamento (Pointer Event Stream)</h3>
              <span class="pulsing-badge">RxJS Activo</span>
            </div>
            <p class="card-desc">Movimente o cursor e clique no painel para disparar streams em tempo real.</p>
            
            <div class="coords-display">
              <div class="coord-box">
                <span class="label">Eixo X</span>
                <span class="value">{{ currentCoords.x }}px</span>
              </div>
              <div class="coord-box">
                <span class="label">Eixo Y</span>
                <span class="value">{{ currentCoords.y }}px</span>
              </div>
              <div class="coord-box speed-box">
                <span class="label">Aceleração</span>
                <span class="value highlight-accent">{{ currentSpeed }} px/ms</span>
              </div>
            </div>
          </div>

          <!-- Reactive Form -->
          <div class="form-card">
            <h3>Formulário Corporativo Reativo</h3>
            <p class="card-desc">Campos monitorados dinamicamente via observables de alteração de valor.</p>

            <form [formGroup]="authForm" (ngSubmit)="onSubmit()" class="premium-form">
              <div class="form-group">
                <label>E-mail Corporativo</label>
                <input 
                  formControlName="email" 
                  type="email" 
                  placeholder="empresa@aura.com" 
                  class="premium-input" 
                />
                @if (authForm.get('email')?.touched && authForm.get('email')?.errors) {
                  <span class="field-error">E-mail corporativo inválido.</span>
                }
              </div>

              <div class="form-group">
                <label>Senha de Acesso</label>
                <input 
                  formControlName="password" 
                  type="password" 
                  placeholder="Mínimo 6 caracteres" 
                  class="premium-input" 
                />
                @if (authForm.get('password')?.touched && authForm.get('password')?.errors) {
                  <span class="field-error">Senha deve possuir no mínimo 6 caracteres.</span>
                }
                
                <!-- Password Strength Meter (Real-time entropy stream) -->
                <div class="strength-meter-container">
                  <span class="strength-label">Força da Senha:</span>
                  <div class="meter-bar-track">
                    <div 
                      [style.width.%]="passwordStrength$ | async" 
                      [class]="['meter-bar-fill', getStrengthClass((passwordStrength$ | async) || 0)]"
                    ></div>
                  </div>
                </div>
              </div>

              <button 
                [disabled]="authForm.invalid" 
                type="submit" 
                class="form-submit-btn"
              >
                Concluir Cadastro ⚡
              </button>
            </form>
          </div>
        </section>

        <!-- Right: Reactive Real-time Console Terminal -->
        <section class="console-section">
          <div class="console-card">
            <div class="console-header">
              <h3>Terminal de Logs Reativos</h3>
              <button (click)="clearLogs()" class="clear-btn">Limpar Console 🗑️</button>
            </div>
            
            <div class="console-logs-box">
              @for (log of logs$ | async; track log.id) {
                <div class="log-line">
                  <span class="log-time">[{{ log.timestamp }}]</span>
                  <span [class]="['log-badge', log.category]">{{ log.category }}</span>
                  <span class="log-content">{{ log.content }}</span>
                </div>
              } @empty {
                <div class="log-line empty-log">
                  Aguardando interações do usuário para popular o console assíncrono...
                </div>
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .reactive-wrapper {
      padding: 48px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .app-header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 40px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 6px;
    }

    .brand-icon {
      font-size: 32px;
    }

    .brand h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .highlight {
      color: hsl(var(--primary));
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 14px;
    }

    /* Main Layout Grid */
    .main-layout {
      display: grid;
      grid-template-columns: 1fr 500px;
      gap: 32px;
    }

    @media (max-width: 1024px) {
      .main-layout {
        grid-template-columns: 1fr;
      }
    }

    /* Left Side Elements */
    .playground-section {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .tracking-card, .form-card, .console-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 32px;
      box-shadow: var(--shadow-sm);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .pulsing-badge {
      font-size: 10px;
      font-weight: 700;
      background-color: var(--accent-glow);
      color: hsl(var(--accent));
      padding: 4px 10px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-desc {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    .coords-display {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .coord-box {
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border);
      padding: 16px;
      border-radius: var(--radius-sm);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .coord-box .label {
      font-size: 10px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .coord-box .value {
      font-size: 20px;
      font-weight: 800;
    }

    .highlight-accent {
      color: hsl(var(--accent));
      text-shadow: 0 0 10px hsla(var(--accent), 0.3);
    }

    /* Forms */
    .premium-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .premium-input {
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 600;
      outline: none;
      transition: border-color 0.25s;
    }

    .premium-input:focus {
      border-color: var(--border-focus);
    }

    .field-error {
      font-size: 11px;
      font-weight: 700;
      color: hsl(var(--primary));
      margin-top: 4px;
    }

    .form-submit-btn {
      background: linear-gradient(135deg, hsl(var(--primary)), #f04aa2);
      border: none;
      color: white;
      padding: 14px;
      font-size: 13px;
      font-weight: 700;
      border-radius: var(--radius-sm);
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(240, 74, 162, 0.35);
      transition: opacity 0.2s;
    }

    .form-submit-btn:hover {
      opacity: 0.95;
    }

    .form-submit-btn:disabled {
      background: var(--border);
      color: var(--text-muted);
      cursor: not-allowed;
      box-shadow: none;
    }

    /* Password Strength Meter */
    .strength-meter-container {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 10px;
    }

    .strength-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
    }

    .meter-bar-track {
      flex-grow: 1;
      height: 6px;
      background-color: var(--border);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .meter-bar-fill {
      height: 100%;
      width: 0%;
      border-radius: var(--radius-full);
      transition: width 0.3s ease, background-color 0.3s ease;
    }

    .meter-bar-fill.weak {
      background-color: #ff4a4a;
    }

    .meter-bar-fill.medium {
      background-color: #ffc83b;
    }

    .meter-bar-fill.strong {
      background-color: hsl(var(--accent));
    }

    /* Terminal Console */
    .console-card {
      display: flex;
      flex-direction: column;
      height: 570px;
    }

    .console-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .clear-btn {
      background: none;
      border: 1px solid var(--border);
      color: var(--text-secondary);
      padding: 6px 14px;
      border-radius: var(--radius-full);
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .clear-btn:hover {
      background-color: var(--bg-surface-hover);
      color: var(--text-primary);
    }

    .console-logs-box {
      flex-grow: 1;
      background-color: #010105;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 20px;
      font-family: var(--font-mono);
      font-size: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .log-line {
      display: flex;
      gap: 10px;
      align-items: center;
      line-height: 1.5;
    }

    .log-time {
      color: var(--text-muted);
    }

    .log-badge {
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .log-badge.mouse {
      background-color: var(--accent-glow);
      color: hsl(var(--accent));
    }

    .log-badge.click {
      background-color: var(--primary-glow);
      color: hsl(var(--primary));
    }

    .log-badge.keyboard {
      background-color: hsla(280, 100%, 60%, 0.15);
      color: #c95cff;
    }

    .log-badge.form {
      background-color: hsla(45, 100%, 50%, 0.15);
      color: #ffc83b;
    }

    .log-content {
      color: var(--text-primary);
      word-break: break-all;
    }

    .empty-log {
      color: var(--text-muted);
      font-style: italic;
      text-align: center;
      padding: 40px 20px;
      line-height: 1.6;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('trackingArea', { static: true }) trackingAreaRef!: ElementRef;

  authForm!: FormGroup;
  
  // Real-time states
  currentCoords: MouseCoordinates = { x: 0, y: 0 };
  currentSpeed = 0;

  // Subjects for reactive pipes
  private logsSubject = new BehaviorSubject<StreamLogItem[]>([]);
  logs$: Observable<StreamLogItem[]> = this.logsSubject.asObservable();

  private strengthSubject = new BehaviorSubject<number>(0);
  passwordStrength$: Observable<number> = this.strengthSubject.asObservable();

  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.setupReactiveStreams();
    this.setupFormStreams();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setupReactiveStreams() {
    const element = this.trackingAreaRef.nativeElement;

    // Stream 1: Mouse movement coordinate tracking inside the area
    const mouseMove$ = fromEvent<MouseEvent>(element, 'mousemove').pipe(
      throttleTime(20), // Throttle at 20ms to avoid DOM rendering overload
      map(ev => {
        const rect = element.getBoundingClientRect();
        return {
          x: Math.round(ev.clientX - rect.left),
          y: Math.round(ev.clientY - rect.top)
        };
      }),
      tap(coords => {
        this.currentCoords = coords;
      })
    );

    // Stream 2: Mouse speed mapping using our CUSTOM RXJS OPERATOR calculateSpeed!
    const speed$ = mouseMove$.pipe(
      calculateSpeed(),
      tap(speed => {
        this.currentSpeed = speed;
      })
    );

    // Stream 3: High frequency coordinate logging throttle
    const coordinateLogger$ = mouseMove$.pipe(
      throttleTime(1000), // Log coordinates only once every second
      tap(coords => {
        this.addLog('mouse', `Coordenadas do ponteiro: [X: ${coords.x}px, Y: ${coords.y}px]`);
      })
    );

    // Stream 4: Click events logging
    const click$ = fromEvent<MouseEvent>(element, 'click').pipe(
      tap(ev => {
        this.addLog('click', `Clique detectado no ponto: [X: ${ev.offsetX}px, Y: ${ev.offsetY}px]`);
      })
    );

    // Stream 5: Keydown capture outside tracking to register hotkeys
    const keydown$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
      filter(ev => ev.ctrlKey || ev.key.length === 1), // Intercept ctrl combinations or single keys
      throttleTime(200),
      tap(ev => {
        this.addLog('keyboard', `Tecla capturada: "${ev.key}" (Ctrl: ${ev.ctrlKey})`);
      })
    );

    // Merge and subscribe
    this.subscriptions.add(merge(mouseMove$, speed$, coordinateLogger$, click$, keydown$).subscribe());
  }

  private setupFormStreams() {
    // Stream 6: Track password input re-actively to calculate strength percentage
    const passwordControl = this.authForm.get('password');
    if (passwordControl) {
      const passwordChanges$ = passwordControl.valueChanges.pipe(
        map((val: string) => {
          if (!val) return 0;
          let strength = 0;
          if (val.length >= 6) strength += 30;
          if (val.length >= 10) strength += 20;
          if (/[A-Z]/.test(val)) strength += 25; // uppercase check
          if (/[0-9]/.test(val)) strength += 15; // numeric check
          if (/[^A-Za-z0-9]/.test(val)) strength += 10; // special char check
          return strength;
        }),
        tap(strength => {
          this.strengthSubject.next(strength);
        })
      );
      this.subscriptions.add(passwordChanges$.subscribe());
    }

    // Stream 7: Form validations trigger console logs
    this.subscriptions.add(
      this.authForm.valueChanges.pipe(
        throttleTime(1500),
        tap(() => {
          this.addLog('form', `Verificação: Status do Formulário Reativo = ${this.authForm.status}`);
        })
      ).subscribe()
    );
  }

  getStrengthClass(strength: number): string {
    if (strength < 50) return 'weak';
    if (strength < 80) return 'medium';
    return 'strong';
  }

  onSubmit() {
    if (this.authForm.invalid) return;
    this.addLog('form', `CADASTRO CONCLUÍDO COM SUCESSO: [E-mail: ${this.authForm.value.email}]`);
    this.authForm.reset();
    this.strengthSubject.next(0);
  }

  clearLogs() {
    this.logsSubject.next([]);
    this.addLog('form', 'Console de logs reativos limpo pelo administrador.');
  }

  private addLog(category: 'mouse' | 'click' | 'keyboard' | 'form', content: string) {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    const newLog: StreamLogItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp,
      category,
      content
    };
    this.logsSubject.next([newLog, ...this.logsSubject.value.slice(0, 49)]); // Cap logs list at 50 elements
  }
}
