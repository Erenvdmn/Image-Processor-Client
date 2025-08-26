import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../helpers/ApiManager";
import FileUploader from "../components/FileUploader";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Home() {
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const previewUrl = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

  const handleUpload = async () => {
    if (!image) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("tag", tag);

      await ApiRequest("upload", "POST", formData, true);
      navigate("/library");
    } catch (error) {
      console.error("Image couldn't be uploaded", error);
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setImage(null);
    setTag("");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };

  return (
    <div className="min-h-screen bg-[#001BB7] flex items-center justify-center p-6" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 0}}>
      <Card className="w-full max-w-xl bg-[#0046FF] text-white shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl">Upload</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="border-2 border-dashed border-white/70 rounded-md p-8 text-center">
            <FileUploader onFileSelect={setImage} />
          </div>

          {image && (
            <div className="mt-6 grid gap-4">
              <div className="flex items-center gap-4">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                )}
                <div className="text-xs text-white/90">
                  <div className="font-semibold truncate max-w-[220px]">{image.name}</div>
                  <div>{(image.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tag" className="text-white">Tag</Label>
                <Input
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="ör. fatura, tatil, profil"
                  className="bg-white text-black"
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={clearSelection} disabled={!image || isUploading}>
            Clear
          </Button>
          <Button onClick={handleUpload} disabled={!image || isUploading} variant="orange" className="bg-orange-500 hover:bg-orange-600 text-white">
            {isUploading ? "Loading..." : "Upload"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}