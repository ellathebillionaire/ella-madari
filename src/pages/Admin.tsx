import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProjects, ProjectWithImages } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Eye, EyeOff, Upload, LogOut, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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

const ProjectEditor = ({ 
  project, 
  onUpdate, 
  onDelete, 
  onAddImage, 
  onDeleteImage,
  onUpload 
}: {
  project: ProjectWithImages;
  onUpdate: (id: string, updates: Partial<ProjectWithImages>) => Promise<{ error: Error | null }>;
  onDelete: (id: string) => Promise<{ error: Error | null }>;
  onAddImage: (projectId: string, imageUrl: string) => Promise<{ error: Error | null }>;
  onDeleteImage: (imageId: string) => Promise<{ error: Error | null }>;
  onUpload: (file: File, projectSlug: string) => Promise<{ url: string | null; error: Error | null }>;
}) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    const { error } = await onUpdate(project.id, { name, description });
    if (error) {
      toast.error('שגיאה בשמירה');
    } else {
      toast.success('נשמר בהצלחה');
      setEditing(false);
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

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <span className="text-xs px-2 py-1 bg-muted rounded">{project.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleVisibility}
            title={project.is_visible ? 'הסתר' : 'הצג'}
          >
            {project.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDeleteProject}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {editing ? (
          <div className="space-y-3">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="שם הפרויקט"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="תיאור"
            />
            <div className="flex gap-2">
              <Button onClick={handleSave}>שמור</Button>
              <Button variant="outline" onClick={() => setEditing(false)}>ביטול</Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-2">{project.description || 'אין תיאור'}</p>
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              ערוך פרטים
            </Button>
          </div>
        )}

        {/* Images Grid */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">תמונות ({project.project_images?.length || 0})</h4>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {project.project_images?.map((image) => (
              <div key={image.id} className="relative group aspect-square rounded overflow-hidden bg-muted">
                <img
                  src={image.image_url}
                  alt={image.alt_text || project.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            {/* Upload Button */}
            <label className="aspect-square rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              {uploading ? (
                <span className="text-xs text-muted-foreground">מעלה...</span>
              ) : (
                <Upload className="h-5 w-5 text-muted-foreground" />
              )}
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { projects, loading: projectsLoading, updateProject, deleteProject, addProjectImage, deleteProjectImage, uploadImage, addProject } = useProjects();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    slug: '',
    category: 'branding' as 'branding' | 'website' | 'print',
    description: ''
  });

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
      mobile_image: null
    });
    
    if (error) {
      toast.error('שגיאה בהוספת פרויקט');
    } else {
      toast.success('הפרויקט נוסף בהצלחה');
      setNewProject({ name: '', slug: '', category: 'branding', description: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-medium">ניהול פורטפוליו</h1>
          </div>
          <Button variant="ghost" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            התנתק
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light">פרויקטים</h2>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            פרויקט חדש
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>פרויקט חדש</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="שם הפרויקט"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
              <Input
                placeholder="Slug (באנגלית, ללא רווחים)"
                value={newProject.slug}
                onChange={(e) => setNewProject({ ...newProject, slug: e.target.value.toLowerCase().replace(/\s/g, '-') })}
                dir="ltr"
              />
              <select
                className="w-full p-2 border rounded-md"
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value as 'branding' | 'website' | 'print' })}
              >
                <option value="branding">מיתוג</option>
                <option value="website">אתר</option>
              </select>
              <Textarea
                placeholder="תיאור"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleAddProject}>הוסף פרויקט</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>ביטול</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {projectsLoading ? (
          <p>טוען פרויקטים...</p>
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
          projects.map((project) => (
            <ProjectEditor
              key={project.id}
              project={project}
              onUpdate={updateProject}
              onDelete={deleteProject}
              onAddImage={addProjectImage}
              onDeleteImage={deleteProjectImage}
              onUpload={uploadImage}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Admin;
