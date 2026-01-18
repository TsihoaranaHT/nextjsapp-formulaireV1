// Global types are declared in types/global.d.ts

/**
 * Push un événement dans le dataLayer GTM
 */
export function pushToDataLayer(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
  }
}

/**
 * Track le début du funnel
 */
export function trackFunnelStart(step: number = 1) {
  pushToDataLayer('funnel_start', { step });
}

/**
 * Track une question répondue
 */
export function trackQuestionAnswered(
  questionId: number,
  questionTitle: string,
  answers: string[],
  isMultiSelect: boolean
) {
  pushToDataLayer('question_answered', {
    question_id: questionId,
    question_title: questionTitle,
    answers,
    is_multiselect: isMultiSelect,
  });
}

/**
 * Track la navigation entre questions
 */
export function trackQuestionNavigation(
  fromQuestion: number,
  toQuestion: number,
  direction: 'next' | 'back'
) {
  pushToDataLayer('question_navigation', {
    from_question: fromQuestion,
    to_question: toQuestion,
    direction,
  });
}

/**
 * Track la fin du questionnaire
 */
export function trackQuestionnaireComplete(totalQuestions: number, timeSpentSeconds: number) {
  pushToDataLayer('questionnaire_complete', {
    total_questions: totalQuestions,
    time_spent_seconds: timeSpentSeconds,
  });
}

/**
 * Track la sélection du type de profil
 */
export function trackProfileTypeSelected(profileType: string) {
  pushToDataLayer('profile_type_selected', {
    profile_type: profileType,
  });
}

/**
 * Track la complétion du profil
 */
export function trackProfileComplete(profileType: string, hasCompany: boolean, location?: string) {
  pushToDataLayer('profile_complete', {
    profile_type: profileType,
    has_company: hasCompany,
    location,
  });
}

/**
 * Track le clic sur une carte fournisseur
 */
export function trackSupplierCardClick(
  supplierId: string,
  supplierName: string,
  matchScore: number,
  action: 'view_details' | 'toggle_select'
) {
  pushToDataLayer('supplier_card_click', {
    supplier_id: supplierId,
    supplier_name: supplierName,
    match_score: matchScore,
    action,
  });
}

/**
 * Track le changement de sélection fournisseur
 */
export function trackSupplierSelectionChange(
  supplierId: string,
  action: 'add' | 'remove',
  totalSelected: number
) {
  pushToDataLayer('supplier_selection_change', {
    supplier_id: supplierId,
    action,
    total_selected: totalSelected,
  });
}

/**
 * Track l'ouverture du modal de comparaison
 */
export function trackComparisonModalOpen(supplierIds: string[]) {
  pushToDataLayer('comparison_modal_open', {
    suppliers_compared: supplierIds,
  });
}

/**
 * Track la tentative de soumission du formulaire
 */
export function trackFormSubmitAttempt(isValid: boolean, missingFields?: string[]) {
  pushToDataLayer('form_submit_attempt', {
    is_valid: isValid,
    missing_fields: missingFields,
  });
}

/**
 * Track la soumission réussie du lead
 */
export function trackLeadSubmitted(leadId: string, suppliersCount: number, profileType: string) {
  pushToDataLayer('lead_submitted', {
    lead_id: leadId,
    suppliers_count: suppliersCount,
    profile_type: profileType,
    conversion: true,
  });
}

/**
 * Track une erreur de soumission
 */
export function trackLeadSubmissionError(errorType: string, errorMessage: string) {
  pushToDataLayer('lead_submission_error', {
    error_type: errorType,
    error_message: errorMessage,
  });
}

/**
 * Track la recherche d'entreprise
 */
export function trackCompanySearch(query: string, resultsCount: number) {
  pushToDataLayer('company_search', {
    query_length: query.length,
    results_count: resultsCount,
  });
}

/**
 * Track la vue de la page de sélection
 */
export function trackSelectionPageView(recommendedCount: number, totalCount: number) {
  pushToDataLayer('selection_page_view', {
    recommended_count: recommendedCount,
    total_count: totalCount,
  });
}

/**
 * Track la vue du formulaire de contact
 */
export function trackContactFormView(selectedSuppliersCount: number) {
  pushToDataLayer('contact_form_view', {
    selected_count: selectedSuppliersCount,
  });
}

/**
 * Obtenir ou créer un ID utilisateur unique (persistant)
 */
function getUserId(): string {
  if (typeof window === 'undefined') return 'unknown';

  let userId = localStorage.getItem('hp_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('hp_user_id', userId);
  }
  return userId;
}

/**
 * Obtenir ou créer un ID de session (temporaire)
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return 'unknown';

  let sessionId = sessionStorage.getItem('hp_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('hp_session_id', sessionId);
  }
  return sessionId;
}

/**
 * Vérifier si c'est la première vue d'un modal/page pour cet utilisateur
 */
function isFirstView(key: string): boolean {
  if (typeof window === 'undefined') return true;

  const storageKey = `hp_viewed_${key}`;
  const alreadyViewed = sessionStorage.getItem(storageKey);

  if (!alreadyViewed) {
    sessionStorage.setItem(storageKey, 'true');
    return true;
  }
  return false;
}

/**
 * Track l'ouverture du modal de modification de critères
 */
export function trackModifyCriteriaModalView() {
  const userId = getUserId();
  const sessionId = getSessionId();
  const isFirstViewForSession = isFirstView('modify_criteria_modal');

  pushToDataLayer('modify_criteria_modal_view', {
    user_id: userId,
    session_id: sessionId,
    is_first_view: isFirstViewForSession,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track la modification effective de critères
 */
export function trackCriteriaModified(criteriaCount: number, modifiedFields: string[]) {
  const userId = getUserId();

  pushToDataLayer('criteria_modified', {
    user_id: userId,
    criteria_count: criteriaCount,
    modified_fields: modifiedFields,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track l'ouverture du modal "Autre chose à ajouter"
 */
export function trackCustomNeedModalView() {
  const userId = getUserId();
  const sessionId = getSessionId();
  const isFirstViewForSession = isFirstView('custom_need_modal');

  pushToDataLayer('custom_need_modal_view', {
    user_id: userId,
    session_id: sessionId,
    is_first_view: isFirstViewForSession,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track l'ouverture du modal de comparaison (avec déduplication)
 */
export function trackComparisonModalView(supplierIds: string[]) {
  const userId = getUserId();
  const sessionId = getSessionId();
  const isFirstViewForSession = isFirstView('comparison_modal');

  pushToDataLayer('comparison_modal_view', {
    user_id: userId,
    session_id: sessionId,
    is_first_view: isFirstViewForSession,
    suppliers_compared: supplierIds,
    suppliers_count: supplierIds.length,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track l'ouverture du modal fiche produit (avec déduplication)
 */
export function trackProductModalView(productId: string, productName: string, supplierId: string) {
  const userId = getUserId();
  const sessionId = getSessionId();
  const modalKey = `product_modal_${productId}`;
  const isFirstViewForSession = isFirstView(modalKey);

  pushToDataLayer('product_modal_view', {
    user_id: userId,
    session_id: sessionId,
    is_first_view: isFirstViewForSession,
    product_id: productId,
    product_name: productName,
    supplier_id: supplierId,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Identifier l'utilisateur avec ses informations
 */
export function identifyUser(email: string, profileType?: string, companyName?: string) {
  const userId = getUserId();
  const sessionId = getSessionId();

  pushToDataLayer('user_identified', {
    user_id: userId,
    session_id: sessionId,
    email,
    profile_type: profileType,
    company_name: companyName,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Obtenir le type d'appareil
 */
function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';

  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Obtenir les informations de l'appareil
 */
function getDeviceInfo() {
  if (typeof window === 'undefined') {
    return {
      device_type: 'unknown',
      screen_width: 0,
      screen_height: 0,
      user_agent: '',
    };
  }

  return {
    device_type: getDeviceType(),
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    user_agent: navigator.userAgent,
  };
}

/**
 * Track un abandon à une étape spécifique
 */
export function trackFunnelAbandonment(
  step: string,
  stepNumber: number,
  timeSpentSeconds: number,
  lastAction?: string
) {
  const userId = getUserId();
  const sessionId = getSessionId();
  const deviceInfo = getDeviceInfo();

  pushToDataLayer('funnel_abandonment', {
    user_id: userId,
    session_id: sessionId,
    step,
    step_number: stepNumber,
    time_spent_seconds: timeSpentSeconds,
    last_action: lastAction,
    ...deviceInfo,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track une erreur de validation de formulaire
 */
export function trackFormValidationError(
  formName: string,
  fieldName: string,
  errorType: string,
  errorMessage: string
) {
  const userId = getUserId();
  const sessionId = getSessionId();

  pushToDataLayer('form_validation_error', {
    user_id: userId,
    session_id: sessionId,
    form_name: formName,
    field_name: fieldName,
    error_type: errorType,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track toutes les erreurs de validation lors d'une tentative de soumission
 */
export function trackFormValidationErrors(
  formName: string,
  errors: Array<{ field: string; type: string; message: string }>
) {
  const userId = getUserId();
  const sessionId = getSessionId();

  pushToDataLayer('form_validation_errors', {
    user_id: userId,
    session_id: sessionId,
    form_name: formName,
    errors_count: errors.length,
    errors,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track les informations de device au début de session
 */
export function trackDeviceInfo() {
  const userId = getUserId();
  const sessionId = getSessionId();
  const deviceInfo = getDeviceInfo();

  pushToDataLayer('device_info', {
    user_id: userId,
    session_id: sessionId,
    ...deviceInfo,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track les sources de trafic (UTM parameters)
 */
export function trackTrafficSource() {
  if (typeof window === 'undefined') return;

  const userId = getUserId();
  const sessionId = getSessionId();
  const urlParams = new URLSearchParams(window.location.search);

  const source = urlParams.get('utm_source') || 'direct';
  const medium = urlParams.get('utm_medium') || 'none';
  const campaign = urlParams.get('utm_campaign') || 'none';
  const term = urlParams.get('utm_term') || '';
  const content = urlParams.get('utm_content') || '';
  const referrer = document.referrer || 'direct';

  pushToDataLayer('traffic_source', {
    user_id: userId,
    session_id: sessionId,
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
    utm_term: term,
    utm_content: content,
    referrer,
    landing_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
}
