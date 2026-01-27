import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProjects, ProjectWithImages } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Eye, EyeOff, Upload, LogOut, ArrowLeft, GripVertical, Copy, Monitor, Smartphone, Palette, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ============ LOGIN COMPONENT ============
const AdminLogin = ({ onLogin, onSignUp }: { 
  onLogin: (email: string, password: string) => Promise<{ error: Error | null }>;
  onSignUp: (email: string, password: string) => Promise<{ error: Error | null }>;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      const { error } = await onSignUp(email, password);
      if (error) {
        toast.error('שגיאה בהרשמה: ' + error.message);
      } else {
        toast.success('נרשמת בהצלחה! כעת צריך להוסיף לך הרשאות מנהל.');
      }
    } else {
      const { error } = await onLogin(email, password);
      if (error) {
        toast.error('שגיאה בהתחברות');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">{isSignUp ? 'הרשמה' : 'כניסת מנהל'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
            />
            <Input
              type="password"
              placeholder="סיסמה (מינימום 6 תווים)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              dir="ltr"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'מעבד...' : (isSignUp ? 'הרשם' : 'התחבר')}
            </Button>
          </form>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isSignUp ? 'יש לך חשבון? התחבר' : 'אין לך חשבון? הרשם'}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

// ============ SORTABLE IMAGE ============
const SortableImage = ({ 
  image, 
  projectName, 
  onDelete 
}: { 
  image: { id: string; image_url: string; alt_text: string | null }; 
  projectName: string;
  onDelete: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="relative group aspect-square rounded-lg overflow-hidden bg-muted"
    >
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-1 left-1 p-1 bg-background/80 rounded cursor-grab opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <GripVertical className="h-3 w-3" />
      </div>
      <img
        src={image.image_url}
        alt={image.alt_text || projectName}
        className="w-full h-full object-cover"
      />
      <button
        onClick={onDelete}
        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
};

// ============ SORTABLE PROJECT CARD ============
const SortableProjectCard = ({ 
  project, 
  onUpdate, 
  onDelete, 
  onAddImage, 
  onDeleteImage,
  onUpload,
  onDuplicate,
  onReorderImages
}: {
  project: ProjectWithImages;
  onUpdate: (id: string, updates: Partial<ProjectWithImages>) => Promise<{ error: Error | null }>;
  onDelete: (id: string) => Promise<{ error: Error | null }>;
  onAddImage: (projectId: string, imageUrl: string) => Promise<{ error: Error | null }>;
  onDeleteImage: (imageId: string) => Promise<{ error: Error | null }>;
  onUpload: (file: File, projectSlug: string) => Promise<{ url: string | null; error: Error | null }>;
  onDuplicate: (project: ProjectWithImages) => Promise<void>;
  onReorderImages: (projectId: string, imageIds: string[]) => Promise<void>;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const [uploading, setUploading] = useState(false);
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);
  const [editingColors, setEditingColors] = useState(false);
  const [colors, setColors] = useState<string[]>(project.colors || []);
  const [newColor, setNewColor] = useState('#000000');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSave = async () => {
    const { error } = await onUpdate(project.id, { name, description });
    if (error) {
      toast.error('שגיאה בשמירה');
    } else {
      toast.success('נשמר בהצלחה');
      setEditing(false);
    }
  };

  const handleSaveColors = async () => {
    const { error } = await onUpdate(project.id, { colors });
    if (error) {
      toast.error('שגיאה בשמירת צבעים');
    } else {
      toast.success('צבעים נשמרו');
      setEditingColors(false);
    }
  };

  const handleToggleVisibility = async () => {
    const { error } = await onUpdate(project.id, { is_visible: !project.is_visible });
    if (error) {
      toast.error('שגיאה');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const { url, error } = await onUpload(file, project.slug);
    
    if (error || !url) {
      toast.error('שגיאה בהעלאת התמונה');
    } else {
      await onAddImage(project.id, url);
      toast.success('התמונה הועלתה בהצלחה');
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleDesktopUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDesktop(true);
    const { url, error } = await onUpload(file, project.slug);
    
    if (error || !url) {
      toast.error('שגיאה בהעלאה');
    } else {
      await onUpdate(project.id, { website_image: url });
      toast.success('תמונת דסקטופ הועלתה');
    }
    setUploadingDesktop(false);
    e.target.value = '';
  };

  const handleMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMobile(true);
    const { url, error } = await onUpload(file, project.slug);
    
    if (error || !url) {
      toast.error('שגיאה בהעלאה');
    } else {
      await onUpdate(project.id, { mobile_image: url });
      toast.success('תמונת מובייל הועלתה');
    }
    setUploadingMobile(false);
    e.target.value = '';
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('האם למחוק את התמונה?')) return;
    const { error } = await onDeleteImage(imageId);
    if (error) {
      toast.error('שגיאה במחיקה');
    } else {
      toast.success('התמונה נמחקה');
    }
  };

  const handleDeleteProject = async () => {
    if (!confirm('האם למחוק את הפרויקט? פעולה זו לא ניתנת לביטול.')) return;
    const { error } = await onDelete(project.id);
    if (error) {
      toast.error('שגיאה במחיקה');
    } else {
      toast.success('הפרויקט נמחק');
    }
  };

  const handleImageDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const images = project.project_images || [];
    const oldIndex = images.findIndex(img => img.id === active.id);
    const newIndex = images.findIndex(img => img.id === over.id);
    
    const newOrder = arrayMove(images, oldIndex, newIndex);
    await onReorderImages(project.id, newOrder.map(img => img.id));
  };

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (colorToRemove: string) => {
    setColors(colors.filter(c => c !== colorToRemove));
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center gap-3 py-3">
          <div 
            {...attributes} 
            {...listeners}
            className="cursor-grab p-1 hover:bg-muted rounded"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex-1 flex items-center gap-3">
            <CardTitle className="text-base">{project.name}</CardTitle>
            <span className="text-xs px-2 py-0.5 bg-muted rounded">{project.category}</span>
            {!project.is_visible && (
              <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">מוסתר</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => onDuplicate(project)} title="שכפל">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleToggleVisibility} title={project.is_visible ? 'הסתר' : 'הצג'}>
              {project.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDeleteProject} className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>

        {expanded && (
          <CardContent className="space-y-6 pt-0">
            {/* Basic Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2">
                פרטים בסיסיים
                {!editing && (
                  <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>ערוך</Button>
                )}
              </h4>
              {editing ? (
                <div className="space-y-3">
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="שם הפרויקט" />
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="תיאור" />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave}>שמור</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditing(false)}>ביטול</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{project.description || 'אין תיאור'}</p>
              )}
            </div>

            {/* Website Screenshots */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                תמונות אתר
              </h4>
              <div className="flex gap-4 flex-wrap items-end">
                {/* Desktop */}
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground">דסקטופ</span>
                  {project.website_image ? (
                    <div className="relative group w-40 aspect-video rounded-lg overflow-hidden bg-muted">
                      <img src={project.website_image} alt="Desktop" className="w-full h-full object-cover" />
                      <button
                        onClick={() => onUpdate(project.id, { website_image: null })}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-40 aspect-video rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50">
                      <input type="file" accept="image/*" onChange={handleDesktopUpload} className="hidden" disabled={uploadingDesktop} />
                      {uploadingDesktop ? <span className="text-xs">מעלה...</span> : <Upload className="h-5 w-5 text-muted-foreground" />}
                    </label>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground">מובייל</span>
                  {project.mobile_image ? (
                    <div className="relative group w-20 aspect-[9/16] rounded-lg overflow-hidden bg-muted">
                      <img src={project.mobile_image} alt="Mobile" className="w-full h-full object-cover" />
                      <button
                        onClick={() => onUpdate(project.id, { mobile_image: null })}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-20 aspect-[9/16] rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50">
                      <input type="file" accept="image/*" onChange={handleMobileUpload} className="hidden" disabled={uploadingMobile} />
                      {uploadingMobile ? <span className="text-xs">מעלה...</span> : <Smartphone className="h-4 w-4 text-muted-foreground" />}
                    </label>
                  )}
                </div>

                {/* Aspect Ratio Selector */}
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground">יחס גובה-רוחב</span>
                  <select
                    value={project.aspect_ratio || '16/9'}
                    onChange={(e) => onUpdate(project.id, { aspect_ratio: e.target.value })}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="16/9">16:9 (רחב)</option>
                    <option value="16/10">16:10</option>
                    <option value="4/3">4:3</option>
                    <option value="3/2">3:2</option>
                    <option value="1/1">1:1 (ריבוע)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                צבעי מותג
                {!editingColors && (
                  <Button variant="ghost" size="sm" onClick={() => setEditingColors(true)}>ערוך</Button>
                )}
              </h4>
              <div className="flex gap-2 flex-wrap items-center">
                {colors.map((color, i) => (
                  <div key={i} className="relative group">
                    <div 
                      className="w-8 h-8 rounded-full border shadow-sm" 
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                    {editingColors && (
                      <button
                        onClick={() => removeColor(color)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {editingColors && (
                  <>
                    <input
                      type="color"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <Button size="sm" variant="outline" onClick={addColor}>+</Button>
                    <Button size="sm" onClick={handleSaveColors}>שמור</Button>
                    <Button size="sm" variant="outline" onClick={() => { setEditingColors(false); setColors(project.colors || []); }}>ביטול</Button>
                  </>
                )}
              </div>
            </div>

            {/* Images Grid */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">תמונות ({project.project_images?.length || 0}) - גרור לשינוי סדר</h4>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleImageDragEnd}>
                <SortableContext items={(project.project_images || []).map(img => img.id)} strategy={horizontalListSortingStrategy}>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {(project.project_images || []).map((image) => (
                      <SortableImage
                        key={image.id}
                        image={image}
                        projectName={project.name}
                        onDelete={() => handleDeleteImage(image.id)}
                      />
                    ))}
                    
                    {/* Upload Button */}
                    <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                      {uploading ? <span className="text-xs text-muted-foreground">מעלה...</span> : <Upload className="h-5 w-5 text-muted-foreground" />}
                    </label>
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {/* Preview Link */}
            <div className="pt-2 border-t">
              <Link to="/" target="_blank" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                צפה בפורטפוליו
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

// ============ MAIN ADMIN COMPONENT ============
const Admin = () => {
  const { user, isAdmin, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { 
    projects, 
    loading: projectsLoading, 
    updateProject, 
    deleteProject, 
    addProjectImage, 
    deleteProjectImage, 
    uploadImage, 
    addProject,
    reorderProjects,
    reorderImages
  } = useProjects();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    slug: '',
    category: 'branding' as 'branding' | 'website' | 'print',
    description: ''
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>טוען...</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={signIn} onSignUp={signUp} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <p className="mb-4">אין לך הרשאות מנהל</p>
            <Button onClick={signOut}>התנתק</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddProject = async () => {
    if (!newProject.name || !newProject.slug) {
      toast.error('נא למלא שם ו-slug');
      return;
    }
    
    const { error } = await addProject({
      name: newProject.name,
      slug: newProject.slug,
      category: newProject.category,
      description: newProject.description,
      is_visible: true,
      display_order: projects.length,
      hero_image: null,
      bg_color: '#F5F5F7',
      accent_color: '#1A1A1A',
      colors: [],
      website_image: null,
      mobile_image: null,
      aspect_ratio: '16/9'
    });
    
    if (error) {
      toast.error('שגיאה בהוספת פרויקט');
    } else {
      toast.success('הפרויקט נוסף בהצלחה');
      setNewProject({ name: '', slug: '', category: 'branding', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDuplicateProject = async (project: ProjectWithImages) => {
    const { error } = await addProject({
      name: `${project.name} (עותק)`,
      slug: `${project.slug}-copy-${Date.now()}`,
      category: project.category,
      description: project.description,
      is_visible: false,
      display_order: projects.length,
      hero_image: project.hero_image,
      bg_color: project.bg_color,
      accent_color: project.accent_color,
      colors: project.colors,
      website_image: project.website_image,
      mobile_image: project.mobile_image,
      aspect_ratio: project.aspect_ratio || '16/9'
    });
    
    if (error) {
      toast.error('שגיאה בשכפול');
    } else {
      toast.success('הפרויקט שוכפל בהצלחה');
    }
  };

  const handleProjectDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex(p => p.id === active.id);
    const newIndex = projects.findIndex(p => p.id === over.id);
    
    const newOrder = arrayMove(projects, oldIndex, newIndex);
    await reorderProjects(newOrder.map(p => p.id));
    toast.success('סדר הפרויקטים עודכן');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-base font-medium">ניהול פורטפוליו</h1>
            <span className="text-xs text-muted-foreground">({projects.length} פרויקטים)</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                צפה באתר
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              התנתק
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-light">פרויקטים</h2>
            <p className="text-xs text-muted-foreground mt-1">גרור לשינוי סדר • לחץ על חץ להרחבה</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            פרויקט חדש
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-6">
            <CardHeader className="py-3">
              <CardTitle className="text-base">פרויקט חדש</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="שם הפרויקט"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
                <Input
                  placeholder="Slug (באנגלית)"
                  value={newProject.slug}
                  onChange={(e) => setNewProject({ ...newProject, slug: e.target.value.toLowerCase().replace(/\s/g, '-') })}
                  dir="ltr"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  className="p-2 border rounded-md text-sm"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value as 'branding' | 'website' | 'print' })}
                >
                  <option value="branding">מיתוג</option>
                  <option value="website">אתר</option>
                </select>
                <Input
                  placeholder="תיאור קצר"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddProject}>הוסף</Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>ביטול</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {projectsLoading ? (
          <p className="text-center py-12 text-muted-foreground">טוען פרויקטים...</p>
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">אין פרויקטים עדיין</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                הוסף פרויקט ראשון
              </Button>
            </CardContent>
          </Card>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleProjectDragEnd}>
            <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
              {projects.map((project) => (
                <SortableProjectCard
                  key={project.id}
                  project={project}
                  onUpdate={updateProject}
                  onDelete={deleteProject}
                  onAddImage={addProjectImage}
                  onDeleteImage={deleteProjectImage}
                  onUpload={uploadImage}
                  onDuplicate={handleDuplicateProject}
                  onReorderImages={reorderImages}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </main>
    </div>
  );
};

export default Admin;